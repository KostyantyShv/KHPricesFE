import React from 'react';
import { Typography, Container, Box, Button, Grid, Card, CardContent } from '@mui/material';
import best_prices from "../../assets/icons/best_prices.png";
import easy_search from "../../assets/icons/easy_search.png";
import save_money from "../../assets/icons/save_money.png";

const MainPage = () => {
  return (
    <Container maxWidth="lg" className="mt-6">
      {/* Introduction Section */}
      <Box className="text-center my-8">
        <Typography variant="h3" className="text-white mb-4">
          Ласкаво просимо до найкращих цін на пальне в Харкові
        </Typography>
        <Typography variant="h6" className="text-gray-400">
          Універсальне місце, щоб знайти найкращі ціни на пальне в місті Харків, Україна. Заощаджуйте гроші, знаходячи найдешевші ціни на пальне поблизу вас.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} md={4}>
          <Card className="dark:bg-gray-800">
            <CardContent>
              <Box className="flex items-center mb-4">
                <Box className="mr-4">
                  <img src={best_prices} alt="Feature 1" className="" width={150} />
                </Box>
                <div>
                  <Typography variant="h6" className="text-white">
                   Актуальні ціни
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Дізнавайтеся найактуальніші ціни на паливо з різних АЗС Харкова.
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="dark:bg-gray-800">
            <CardContent>
              <Box className="flex items-center mb-4">
                <Box className="mr-4">
                  <img src={easy_search} alt="Feature 2" className="" width={150} />
                </Box>
                <div>
                  <Typography variant="h6" className="text-white">
                    Легкий пошук
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Швидко знаходьте АЗС і порівнюйте ціни за допомогою інтуїтивно зрозумілої функції пошуку.
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="dark:bg-gray-800">
            <CardContent>
              <Box className="flex items-center mb-4">
                <Box className="mr-4">
                  <img src={save_money} alt="Feature 3" className=""   width={150}/>
                </Box>
                <div>
                  <Typography variant="h6" className="text-white">
                    Заощаджуйте гроші
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Заощаджуйте на паливі, знаходячи найкращі ціни, перш ніж заправлятися.
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box component='a' href="/search-prices" className="text-center my-8">
        <Button variant="contained" color="primary" className="mx-auto">
          Знайти найкращі ціни зараз
        </Button>
      </Box>
    </Container>
  );
};

export default MainPage;
