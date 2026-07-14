// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs'; 

// export const signup = async (req, res) => {
//   const { fullName, email, password } = req.body;

//   try {
//     console.log(`[AUTH] New Signup Request -> Name: ${fullName}, Email: ${email}`);

//     return res.status(201).json({ 
//       message: "User registered successfully!", 
//       user: { email, fullName } 
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Server error during registration" });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (email === "test@user.com" && password === "password123") {
//       const payload = { userId: "user_123", email: email };
      
//       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

//       res.cookie('token', token, {
//         httpOnly: true,                 
//         secure: process.env.NODE_ENV === 'production', 
//         sameSite: 'lax',                
//         maxAge: 3600000                 
//       });

//       return res.status(200).json({ message: "Login successful", user: payload });
//     }

//     return res.status(400).json({ message: "Invalid email or password" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: "Logged out successfully" });
// };
