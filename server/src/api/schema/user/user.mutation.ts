import { extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/services";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserInterface } from "../../../interface";
import { GraphQLError } from "graphql";
import { SENDEMAIL } from "../../helpers/email";

export const UserInput = inputObjectType({
  name: "userInput",
  definition(t) {
    t.string("email");
    t.string("password");
    t.string("username");
    t.string("fullname");
    t.phone("phone");
    t.date("birthday");
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUserAccount", {
      type: "user",
      args: { user: "userInput", role: "userRoles" },
      resolve: async (
        _,
        { user: { email, password, username, fullname, phone, birthday }, role }
      ): Promise<UserInterface> => {
        const pass = await bcrypt.hash(password, 12);

        if (!email) throw new GraphQLError("Email is requried");
        if (!password) new GraphQLError("Password is required");
        if (!fullname) throw new GraphQLError("Fullname is required");
        if (!phone) throw new GraphQLError("Phone is required");

        const users = await prisma.user.create({
          data: {
            email,
            password: pass,
            role,
            username,
            Profile: {
              create: {
                fullname,
                phone,
                birthday,
              },
            },
          },
        });
        SENDEMAIL(
          users.email,
          "Verify Your Email Address for School Academy",
          `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </head>
          <body>
            <table style="width: 50%;">
              <tbody>
                <tr style="height: 40px">
                  <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">Dear, ${fullname}</td>
                </tr>
                <tr style="height: 80px;">
                  <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">
                    Thank you for signing up for an account with ${email}! To ensure the security of your account and activate it, we need to verify your email address.
                  </td>
                </tr>
                <tr style="height: 80px;">
                  <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">
                    Please click on the link below to verify your email:
                  </td>
                </tr>
                <tr style="height: 80px;">
                  <td>
                    <a href="http://localhost:3000/auth/verification/${users.userID}" style="width: 100%; height: 50px; padding: 20px; background-color: #6f2da8; color: #fff; text-decoration: none; border-radius: 5px; font-weight: 500; font-family: Roboto;">Verification Link</a>
                  </td>
                </tr>
                <tr style="height: 80px;">
                  <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">
                    Once you click the link, your email address will be verified, and your account activation process will be complete. If you encounter any issues with the verification process or have any questions, feel free to reach out to us at schoolacademy@gmail.com.
                  </td>
                </tr>
                <tr style="height: 80px;">
                  <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">
                    Thank you for choosing School Academy! We're excited to have you join our community.
                  </td>
                </tr>
                <tr style="height: 25px;">
                  <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">Best regards,</td>
                </tr>
                <tr style="height: 25px;">
                    <td style="width: 100%; font-size: 20px; font-family:'Roboto'; font-weight: 400;">Joshua Ramin</td>
                  </tr>
              </tbody>
            </table>
          </body>
        </html>
        `
        );

        return users;
      },
    });
    t.field("checkUsernameAvailability", {
      type: "user",
      args: { username: nonNull(stringArg()) },
      resolve: async (_, { username }): Promise<any> => {
        if (!username) throw new GraphQLError("Username is required");

        const users = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (users)
          throw new GraphQLError(`Username ${username}is already exist`);

        return users;
      },
    });
    t.field("findMyEmailAddress", {
      type: "user",
      args: { email: nonNull(stringArg()) },
      resolve: async (_, { email }): Promise<any> => {
        if (!email) throw new GraphQLError("Email Address is required");
        const users = await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            Profile: true,
          },
        });

        if (!users) throw new GraphQLError("Email Address does not exist");

        SENDEMAIL(
          users.email,
          `Reset Your Password for ${users.email} Account`,
          `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
              />
            </head>
            <body>
              <table style="width: 50%;">
                <tbody>
                  <tr style="height: 40px">
                    <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">Dear, ${users.Profile.fullname}</td>
                  </tr>
                  <tr style="height: 80px;">
                    <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">
                      It seems you've requested to reset your password for your ${users.email} account. No worries, we're here to help! To
                      create a new password, simply click on the link below:
                    </td>
                  </tr>
                  <tr style="height: 80px;">
                    <td>
                      <a href="http://localhost:3000/auth/resetpassword/${users.userID}" style="width: 100%; height: 50px; padding: 20px; background-color: #6f2da8; color: #fff; text-decoration: none; border-radius: 5px; font-weight: 500; font-family: Roboto;">Password Reset Link</a>
                    </td>
                   </tr>
                  <tr style="height: 80px;">
                    <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">
                      Once you click the link, you'll be directed to a secure page where
                      you can set a new password for your account. Please make sure to
                      choose a strong password that includes a mix of letters, numbers,
                      and special characters to ensure the security of your account.
                    </td>
                  </tr>
             
                  <tr style="height: 80px;">
                    <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">
                      If you didn't request this password reset, please ignore this email.
                      Your account security is important to us, and we recommend keeping
                      your password confidential and regularly updating it.
                    </td>
                  </tr>
                  <tr style="height: 80px;">
                    <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">
                      If you have any questions or need further assistance, feel free to
                      contact us at schoolacademy@gmail.com. We're always here to help.
                    </td>
                  </tr>
                  <tr style="height: 25px;">
                    <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">Best regards,</td>
                  </tr>
                  <tr style="height: 25px;">
                      <td style="width: 100%; font-size: 16px; font-family:'Roboto'; font-weight: 400;">Joshua Ramin</td>
                    </tr>
                </tbody>
              </table>
            </body>
          </html>
          
        `
        );

        return users;
      },
    });
    t.field("updateVerfiedAccount", {
      type: "user",
      args: { userID: nonNull(idArg()) },
      resolve: async (_, { userID }): Promise<UserInterface> => {
        return await prisma.user.update({
          where: {
            userID,
          },
          data: {
            verified: true,
          },
        });
      },
    });

    t.field("updateUserUsername", {
      type: "user",
      args: { userID: nonNull(idArg()), username: nonNull(stringArg()) },
      resolve: async (_, { userID, username }): Promise<any> => {
        if (!username) throw new GraphQLError("Username is required");

        const users = await prisma.user.findUnique({
          where: { username },
        });

        if (users)
          throw new GraphQLError(`${username} is already exist. try new one`);

        return await prisma.user.update({
          where: { userID },
          data: { username },
        });
      },
    });

    t.field("deleteUserAccount", {
      type: "user",
      args: { userID: nonNull(idArg()) },
      resolve: async (_, { userID }): Promise<UserInterface> => {
        return await prisma.user.delete({
          where: {
            userID,
          },
        });
      },
    });

    t.field("resetUserPassword", {
      type: "user",
      args: {
        password: nonNull(stringArg()),
        retype: nonNull(stringArg()),
        userID: nonNull(idArg()),
      },
      resolve: async (_, { userID, password, retype }): Promise<any> => {
        if (!password) throw new GraphQLError("Password is required");
        if (!retype) throw new GraphQLError("re-type Password is required");
        if (password !== retype)
          throw new GraphQLError("Password and Retype Password is not matched");

        const pass = await bcrypt.hash(password, 12);

        return await prisma.user.update({
          where: {
            userID,
          },
          data: {
            password: pass,
          },
        });
      },
    });
    t.field("login", {
      type: "token",
      args: { username: nonNull(stringArg()), password: nonNull(stringArg()) },
      resolve: async (
        _,
        { username, password },
        { req, res }
      ): Promise<any> => {
        if (!username) throw new GraphQLError("Username is required");

        if (!password) throw new GraphQLError("Password is required");

        const users = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!users)
          throw new GraphQLError("Username does not exist. Try again");

        const validPass = await bcrypt.compare(password, users.password);

        if (!validPass)
          throw new GraphQLError("Password is incorrect. Try again");

        if (users.verified === false)
          throw new GraphQLError("You must verified to access your account.");

        const token = sign(
          { userID: users.userID, role: users.role },
          "itelec",
          {
            algorithm: "HS256",
            expiresIn: 60 * 60 * 7 * 24,
          }
        );

        res.cookie("access_token", token);

        return { token };
      },
    });
  },
});
