import Head from 'next/head';
import Dashboard from '../../components/dashboard/Dashboard';
import NavBar from '../../components/landing/NavBar';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

type DashboardPageProps = {
	publicKey: string;
	authenticatedUser: { publicKey: string };
};

function DashboardPage({ publicKey, authenticatedUser }: DashboardPageProps) {
	// have validation so that i can check if the authenticated user is the same as whoever is
	// viewing

	// Checks if the authenticated user is the same as the user being viewed
	if (authenticatedUser && authenticatedUser?.publicKey !== publicKey) {
		console.log('Not the same user');
		// Redirect or show an error message
	}

	return (
		<NavBar>
			<Head>
				<title>Dashboard</title>
			</Head>
			{/* Add a prop here for whether it is the same as the authenticated user */}
			<Dashboard publicKey={`${publicKey}`} />
		</NavBar>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: DashboardPageProps } | { props: {} }> {
	const { publicKey } = context.query;

	// Get the authenticated session
	const session = await getSession(context);

	// this denies the entire page from being access when different publicKey

	// if (!session || session.user.publicKey !== publicKey) {
	// 	// Redirect or handle unauthorized access
	// 	context.res.statusCode = 403;
	// 	context.res.end();
	// 	return { props: {} };
	// }

	return {
		props: {
			publicKey,
			authenticatedUser: session ? session.user : null,
		},
	};
}

export default DashboardPage;
