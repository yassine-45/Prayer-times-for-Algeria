import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayerCard from "./PrayerCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar-dz");

function MainContent() {
  // State of Timing of Each Prayer
  const [timings, setTimings] = useState({
    Fajr: "04:10",
    Dhuhr: "13:00",
    Asr: "15:35",
    Maghrib: "18:00",
    Isha: "19:25",
  });
  // Initialize the state of the city when Open Web site
  const [city, setCity] = useState({
    id: "16",
    name: "Alger",
    ar_name: "الجزائر",
  });

  // state of date of today using moment js library
  const [today, setToday] = useState("");

  const [nextPrayerindex, setNextPrayerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  // Array of objects Prayers  for modify the Time left using id and the name of Next prayer
  const prayers = [
    {
      id: "Fajr",
      name: "الفجر",
    },
    {
      id: "Dhuhr",
      name: "الظهر",
    },
    {
      id: "Asr",
      name: "العصر",
    },
    {
      id: "Maghrib",
      name: "المغرب",
    },
    {
      id: "Isha",
      name: "العشاء",
    },
  ];

  // Array of object for All cities of Algeria
  const allCity = [
    { id: "1", name: "Adrar", ar_name: "أدرار" },
    { id: "2", name: "Chlef", ar_name: "الشلف" },
    { id: "3", name: "Laghouat", ar_name: "الأغواط" },
    { id: "4", name: "Oum El Bouaghi", ar_name: "أم البواقي" },
    { id: "5", name: "Batna", ar_name: "باتنة" },
    { id: "6", name: "Béjaïa", ar_name: "بجاية" },
    { id: "7", name: "Biskra", ar_name: "بسكرة" },
    { id: "8", name: "Bechar", ar_name: "بشار" },
    { id: "9", name: "Blida", ar_name: "البليدة" },
    { id: "10", name: "Bouira", ar_name: "البويرة" },
    { id: "11", name: "Tamanrasset", ar_name: "تمنراست" },
    { id: "12", name: "Tbessa", ar_name: "تبسة" },
    { id: "13", name: "Tlemcen", ar_name: "تلمسان" },
    { id: "14", name: "Tiaret", ar_name: "تيارت" },
    { id: "15", name: "Tizi Ouzou", ar_name: "تيزي وزو" },
    { id: "16", name: "Alger", ar_name: "الجزائر" },
    { id: "17", name: "Djelfa", ar_name: "الجلفة" },
    { id: "18", name: "Jijel", ar_name: "جيجل" },
    { id: "19", name: "Se9tif", ar_name: "سطيف" },
    { id: "20", name: "Saefda", ar_name: "سعيدة" },
    { id: "21", name: "Skikda", ar_name: "سكيكدة" },
    { id: "22", name: "Sidi Bel Abbes", ar_name: "سيدي بلعباس" },
    { id: "23", name: "Annaba", ar_name: "عنابة" },
    { id: "24", name: "Guelma", ar_name: "قالمة" },
    { id: "25", name: "Constantine", ar_name: "قسنطينة" },
    { id: "26", name: "Medea", ar_name: "المدية" },
    { id: "27", name: "Mostaganem", ar_name: "مستغانم" },
    { id: "28", name: "M'Sila", ar_name: "المسيلة" },
    { id: "29", name: "Mascara", ar_name: "معسكر" },
    { id: "30", name: "Ouargla", ar_name: "ورقلة" },
    { id: "31", name: "Oran", ar_name: "وهران" },
    { id: "32", name: "El Bayadh", ar_name: "البيض" },
    { id: "33", name: "Illizi", ar_name: "إليزي" },
    { id: "34", name: "Bordj Bou Arreridj", ar_name: "برج بوعريريج" },
    { id: "35", name: "Boumerdes", ar_name: "بومرداس" },
    { id: "36", name: "El Tarf", ar_name: "الطارف" },
    { id: "37", name: "Tindouf", ar_name: "تندوف" },
    { id: "38", name: "Tissemsilt", ar_name: "تيسمسيلت" },
    { id: "39", name: "El Oued", ar_name: "الوادي" },
    { id: "40", name: "Khenchela", ar_name: "خنشلة" },
    { id: "41", name: "Souk Ahras", ar_name: "سوق أهراس" },
    { id: "42", name: "Tipaza", ar_name: "تيبازة" },
    { id: "43", name: "Mila", ar_name: "ميلة" },
    { id: "44", name: "Ain Defla", ar_name: "عين الدفلى" },
    { id: "45", name: "Naama", ar_name: "النعامة" },
    { id: "46", name: "Ain Temouchent", ar_name: "عين تموشنت" },
    { id: "47", name: "Ghardaefa", ar_name: "غرداية" },
    { id: "48", name: "Relizane", ar_name: "غليزان" },
    { id: "49", name: "El M'ghair", ar_name: "المغير" },
    { id: "50", name: "El Menia", ar_name: "المنيعة" },
    { id: "51", name: "Ouled Djellal", ar_name: "أولاد جلال" },
    { id: "52", name: "Bordj Baji Mokhtar", ar_name: "برج باجي مختار" },
    { id: "53", name: "Béni Abbès", ar_name: "بني عباس" },
    { id: "54", name: "Timimoun", ar_name: "تيميمون" },
    { id: "55", name: "Touggourt", ar_name: "تقرت" },
    { id: "56", name: "Djanet", ar_name: "جانت" },
    { id: "57", name: "In Salah", ar_name: "عين صالح" },
    { id: "58", name: "In Guezzam", ar_name: "عين قزام" },
  ];
  // This function gets data related to city names from Adhan API and pushes this data into timings state.
  const getTimings = async () => {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=DZ&city=${city.name}`
    );
    setTimings(res.data.data.timings);
  };
  // Trigger getTimings function whenever the 'city' value changes.
  // This ensures that the timings are updated dynamically based on the selected or updated city.
  useEffect(() => {
    getTimings();
  }, [city]);

  const SetupCountdownTimer = () => {
    //initializes the current date in a formatted string.
    const formatDate = moment().format("LLLL");
    setToday(formatDate);

    //this function  give momentnow the current time of algeria
    const momentNow = moment();
    //initialize the prayer index
    let prayerIndex = 0;
    /*This condition compares the current time if it is after the prayer and before it.
    If it is before it, then the next prayer is of index 1,etc*/
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    //push index of prayer inside state
    setNextPrayerIndex(prayerIndex);
    const nextPrayerObject = prayers[prayerIndex];
    const timeOfPrayerNow = timings[nextPrayerObject.id];

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = moment(timeOfPrayerNow, "hh:mm:ss").diff(
      momentNow
    );

    // Convert the difference into a Moment duration
    const duration = moment.duration(differenceInMilliseconds);

    // Format the duration as HH:mm:ss
    const formattedDifference = moment
      .utc(duration.asMilliseconds())
      .format("HH:mm:ss");
    setTimeLeft(formattedDifference);
  };

  useEffect(() => {
    // Sets up a countdown timer that updates every second
    let interval = setInterval(() => {
      SetupCountdownTimer();
    }, 10);

    // Cleans up the interval on component unmount to prevent memory leaks.
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  /*This function retrieves the currently selected city, compares it with the list of city names,
 and returns the corresponding object for the selected city and push it inside city name*/
  const handleCityChange = (event) => {
    const objectCity = allCity.find((city) => {
      return city.name == event.target.value;
    });
    setCity(objectCity);
  };

  return (
    <>
      <Grid container columns={{ xs: 9, sm: 10, md: 12 }}>
        <Grid size={5}>
          <div>
            <h2>{today}</h2>
            <h1>{city.ar_name}</h1>
          </div>
        </Grid>
        <Grid size={4}>
          <div>
            <h2>الوقت المتبقي للصلاة {prayers[nextPrayerindex].name}</h2>
            <h1>{timeLeft}</h1>
          </div>
        </Grid>
        <Grid size={3}>
          <div>
            <h2>إختر المدينة</h2>
            <FormControl sx={{ width: "200px" }} size="small">
              <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
              <Select
                style={{ fontWeight: "bold", fontSize: 20 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city ? city.name : ""}
                label="المدينة"
                onChange={handleCityChange}
              >
                {allCity.map((city) => {
                  return (
                    <MenuItem key={city.id} value={city.name}>
                      {city.ar_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ mt: 4 }} />
      <Stack
        style={{ justifyContent: "space-around", flexWrap: "wrap" }}
        direction="row"
      >
        <PrayerCard
          name="الفجر"
          time={timings.Fajr}
          url="https://cdn.alweb.com/thumbs/salawate/article/fit710x532/1/%D9%85%D8%A7-%D9%81%D8%B6%D9%84-%D8%B5%D9%84%D8%A7%D8%A9-%D8%A7%D9%84%D9%81%D8%AC%D8%B1.jpg"
        />
        <PrayerCard
          name="الظهر"
          time={timings.Dhuhr}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUJjErrBAGeUfwO8PItNg7H-XNdBMmjwCuA&s"
        />
        <PrayerCard
          name="العصر"
          time={timings.Asr}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgBXgS8bes83hG4X2ynVHl3tXbuIn29sebQ&s"
        />
        <PrayerCard
          name="المغرب"
          time={timings.Maghrib}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qzsVLQb4_u7y1OMbmG9F56VgOxF4SsznOA&s"
        />
        <PrayerCard
          name="العشاء"
          time={timings.Isha}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GgHA-CQrZcbpACCTu4W9TOjj0hf3sA3rpA&s"
        />
      </Stack>
      <Divider variant="middle" sx={{ mt: 4 }} />
      <div className="footer-container">
        <p>Made By 💙 YassineDev © 2024</p>
      </div>
    </>
  );
}

export default MainContent;
