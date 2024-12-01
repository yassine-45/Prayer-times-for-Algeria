import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../App.css";

export default function PrayerCard({ name, time, url }) {
  return (
    <Card sx={{ width: { xs: "45%", sm: "30%", md: "18%", lg: "19%" }, mt: 4 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={url} />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
        >
          {name}
        </Typography>
        <Typography
          variant="h3"
          style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }} color="text.secondary"
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
