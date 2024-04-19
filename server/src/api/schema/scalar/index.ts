import { GraphQLDateTime, GraphQLPhoneNumber, GraphQLDate } from 'graphql-scalars'
import { GraphQLUpload } from 'graphql-upload-ts';
import { asNexusMethod } from 'nexus'


export const DateTimeGQL = asNexusMethod(GraphQLDateTime, "datetime");
export const DateGQL = asNexusMethod(GraphQLDate, "date");
export const PhoneGQL = asNexusMethod(GraphQLPhoneNumber, "phone")
export const UploadGQL = asNexusMethod(GraphQLUpload, "Upload")