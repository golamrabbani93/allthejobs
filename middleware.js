import {NextResponse} from 'next/server';
import {getCurrentUser} from './services/AccessToken/AccessToken';

const AuthRoutes = ['/login', '/register'];

const roleBasedRoutes = {
	talent: [/^\/dashboard\/talent/],
	employer: [/^\/dashboard\/employer/],
	consultant: [/^\/dashboard\/consultant/],
	admin: [/^\/dashboard\/admin/],
};

export async function middleware(request) {
	const {pathname} = request.nextUrl;

	const user = await getCurrentUser();
	// Redirect to login if user is not authenticated and route is not public
	if (!user) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next(); //* Allow access to auth routes
		} else {
			return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
		}
	}
	// Handle role-based routes if user is authenticated
	if (user?.role && roleBasedRoutes[user?.role]) {
		const routes = roleBasedRoutes[user?.role];

		if (routes.some((route) => pathname.match(route))) {
			return NextResponse.next(); // Allow access if route matches user's role
		}
	}

	// Redirect to home page if user does not have access to the route
	return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/dashboard', '/dashboard/:page*', '/login', '/register'],
};
