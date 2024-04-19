import React, { useState } from "react";

const month = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

const day = [
   "01",
   "02",
   "03",
   "04",
   "05",
   "06",
   "07",
   "08",
   "09",
   "10",
   "11",
   "12",
   "13",
   "14",
   "15",
   "16",
   "17",
   "18",
   "19",
   "20",
   "20",
   "21",
   "22",
   "23",
   "24",
   "25",
   "26",
   "27",
   "28",
   "29",
   "30",
   "31",
];

const year = [
   "1999",
   "2000",
   "2001",
   "2002",
   "2003",
   "2004",
   "2005",
   "2006",
   "2007",
   "2008",
   "2009",
   "2010",
   "2011",
   "2012",
   "2013",
   "2014",
   "2015",
   "2016",
   "2017",
   "2018",
   "2019",
   "2020",
   "2021",
   "2022",
   "2023",
   "2024",
];

export default function Birthday({ styles }) {
   const [months, setMonths] = useState("");
   const [days, setDays] = useState("");
   const [years, setYears] = useState("");
   return (
      <div className={styles.mainContainer}>
         <h2>Enter your Birthday</h2>

         {`${years}-${months}-${days}`}
         <div className={styles.calendar}>
            <div className={styles.months}>
               <label>Month</label>
               <input
                  type='text'
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
               />
               <div>
                  {month.map((name, i) => (
                     <button
                        value={`${i + 1 > 9 ? i + 1 : `0${i + 1}`}`}
                        onClick={(e) => setMonths(e.currentTarget.value)}
                        type='button'
                        key={name}
                     >
                        {`${i + 1 > 9 ? i + 1 : `0${i + 1}`}`}
                     </button>
                  ))}
               </div>
            </div>
            <div className={styles.days}>
               {" "}
               <label>Day</label>
               <input
                  type='text'
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
               />
               <div>
                  {day.map((name) => (
                     <button
                        value={name}
                        onClick={(e) => setDays(e.currentTarget.value)}
                        type='button'
                        key={name}
                     >
                        {name}
                     </button>
                  ))}
               </div>
            </div>
            <div className={styles.years}>
               <label>Year</label>
               <input
                  type='text'
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
               />
               <div>
                  {year.map((name) => (
                     <button
                        value={name}
                        onClick={(e) => setYears(e.currentTarget.value)}
                        type='button'
                        key={name}
                     >
                        {name}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
