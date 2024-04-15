import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const Layout = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f3d940", 
        minHeight: "96vh",
        paddingTop: "10px", 
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: "#3f51b5", marginTop: "40px" }} 
        >
          QuadB Tech Todo App
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                padding="20px"
              >
                <Typography variant="h5" gutterBottom>
                  Add Task
                </Typography>
                <TaskInput />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                padding="20px"
              >
                <Typography variant="h5" gutterBottom>
                  Tasks
                </Typography>
                <TaskList />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Layout;
