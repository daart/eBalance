import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import db from "./../db/models";
import keys from "./keys";

const { User } = db;
const { jwtSecret } = keys;

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

export default passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            console.log("jwt_payload !!!!>> = ", jwt_payload);
            try {
                let user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user);
                } 
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );

    // passport.use(
    //     new LocalStrategy(
    //         {
    //             usernameField: "email",
    //             passwordField: "password",
    //             session: false
    //         },
    //         async (email, password, done) => {
    //             try {
    //                 let user = await User.findOne({ where: { email } });

    //                 if (!user)
    //                     return done(null, false, {
    //                         errors: {
    //                             password: ["user or password is invalid"]
    //                         }
    //                     });
    //                 let verifiedUser = await bcrypt.compare(
    //                     password,
    //                     user.password
    //                 );

    //                 // console.log(
    //                 //     "MULTYPASSPORT AUTH <<<<< ",
    //                 //     verifiedUser,
    //                 //     " user_DB_password >> ",
    //                 //     user.password,
    //                 //     " request pass ==== ",
    //                 //     password
    //                 // );
    //                 return done(null, user, {
    //                     success: true,
    //                     message: "logged in successfully!"
    //                 });
    //             } catch (err) {
    //                 return done(err);
    //             }
    //         }
    //     )
    // );
};
