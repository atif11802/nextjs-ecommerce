import { getSession } from "next-auth/react";

const Post = ({ data }) => {
	return (
		<div>
			Post
			{data?.map((post) => (
				<div key={post.id}>
					<p>
						{post.id} : {post.title}
					</p>
				</div>
			))}
		</div>
	);
};

export async function getServerSideProps(context) {
	const { res, req } = context;

	// Fetch data from external API
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
	const data = await response.json();

	const session = await getSession(context);

	res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);

	if (!session || session.user.role !== "cat mew") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	// Pass data to the page via props
	return { props: { data } };
}

export default Post;
