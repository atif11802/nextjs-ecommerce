import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../model/User";
import connectDB from "../../../db";

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),

	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			profile(profile) {
				return {
					id: profile.id,
					email: profile.email,
					image: profile.avatar_url,
					location: profile.location,
					role: "buyer",
					name: profile.name,
				};
			},
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
				image: { label: "image", type: "file" },
			},
			async authorize(credentials, req) {
				connectDB();
				console.log(credentials);
				// Add logic here to look up the user from the credentials supplied
				const user = await User.findOne();

				console.log(user);

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),

		// ...add more providers here
	],
	callbacks: {
		// async session({ session, token, user, role }) {
		// 	// session.user.role = user.role;
		// 	session = {
		// 		...session,
		// 		user: {
		// 			id: user._id,
		// 			...session.user,
		// 		},
		// 	};

		// 	return session;
		// },
		async jwt({ token, user, account, profile, isNewUser }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token, user }) {
			session = {
				...session,
				user: {
					_id: user.id,
					role: user.role,
					...session.user,
				},
			};
			return session;
		},
	},
};
export default NextAuth(authOptions);
