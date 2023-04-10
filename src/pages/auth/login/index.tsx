import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Inputs/Input";
import { AuthService } from "@/services/Authservice";
import axios from "axios";
import { useAuth } from "../../../../context/auth";
import { useRouter } from "next/router";

export default function Login() {
  const { setUser } = useAuth();
  const methods = useForm();
  const { handleSubmit } = methods;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginHandler = async (data: any) => {
    console.log("DATA!!", data);
    setLoading(true);
    try {
      const { user, err } = await AuthService.loginWithPassword(
        data.email,
        data.password
      );
      if (err) {
        setLoading(false);
        return;
      } else {
        const idTokenResult = await user?.getIdTokenResult();
        const userResult = await axios.post(
          `http://localhost:8000/api/v1/users/login`,
          {},
          {
            headers: {
              Authorization: "Bearer " + idTokenResult?.token,
            },
          }
        );

        setLoading(false);
        setUser({ ...userResult.data, token: idTokenResult?.token });
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Input label="Email" name="email" />
            <Input label="Password" name="password" type="password" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(loginHandler)}
            >
              {loading ? "Loading" : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
}
