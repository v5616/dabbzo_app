import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers'; // Will be used for server-side auth
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const setAuthCookie = (token: string) => {
  // Using Response cookies API instead of direct cookie manipulation
  const response = NextResponse.next();
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'strict',
  });
  return response;
};

export const removeAuthCookie = () => {
  const response = NextResponse.next();
  response.cookies.delete('auth_token');
  return response;
};

export const getAuthToken = (req: NextRequest) => {
  return req.cookies.get('auth_token')?.value;
};

export const verifyAuth = async (req: NextRequest) => {
  try {
    const token = req.cookies.get('auth_token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
};

export const requireAuth = async (req: NextRequest) => {
  const user = await verifyAuth(req);
  
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Authentication required' },
      { status: 401 }
    );
  }
  
  return user;
};