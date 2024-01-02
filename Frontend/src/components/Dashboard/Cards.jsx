/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function Cards({ data }) {
  const { t } = useTranslation();

  const cards = [
    { title: "Sales", amount: data.sales || 0 },
    { title: "Clients", amount: data.clients || 0 },
    { title: "Companies", amount: data.clients || 0 },
    { title: "Videos", amount: data.videos || 0 },
  ];
  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ textAlign: "left" }}>
              <Avatar sx={{ marginY: "10px" }}>
                <MonetizationOnIcon />
              </Avatar>
              <Typography variant="h6" color="gray">
                {t(`dashboard_${card.title.toLowerCase()}`)}
              </Typography>
              <Typography variant="h5" color="black">
                {card.amount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Cards;
