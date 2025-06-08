import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.background};
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.text}40;
  border-radius: 5px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: ${props => props.theme.transition};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
  font-size: 1rem;
  cursor: pointer;
  transition: ${props => props.theme.transition};

  &:hover {
    opacity: 0.9;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.text};
  font-size: 0.9rem;
`;

const SwitchLink = styled.span`
  color: ${props => props.theme.primary};
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPasswordLink = styled(SwitchLink)`
  display: block;
  text-align: right;
  margin: 0.5rem 0;
`;

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // TODO: Implement login API call
      console.log('Login attempt with:', { email: formData.email, password: formData.password });
      // If successful, close modal and redirect
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      // TODO: Implement signup API call
      console.log('Signup attempt with:', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      // If successful, close modal and redirect
      onClose();
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // TODO: Implement forgot password API call
      console.log('Password reset requested for:', formData.email);
      // Show success message
      setError('Password reset instructions sent to your email');
    } catch (err) {
      setError('Error sending reset instructions. Please try again.');
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <Form onSubmit={handleLogin}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error && <ErrorText>{error}</ErrorText>}
            <ForgotPasswordLink onClick={() => setMode('forgot-password')}>
              Forgot Password?
            </ForgotPasswordLink>
            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </Button>
            <SwitchText>
              Don't have an account?
              <SwitchLink onClick={() => setMode('signup')}>Sign Up</SwitchLink>
            </SwitchText>
          </Form>
        );
      case 'signup':
        return (
          <Form onSubmit={handleSignup}>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {error && <ErrorText>{error}</ErrorText>}
            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </Button>
            <SwitchText>
              Already have an account?
              <SwitchLink onClick={() => setMode('login')}>Login</SwitchLink>
            </SwitchText>
          </Form>
        );
      case 'forgot-password':
        return (
          <Form onSubmit={handleForgotPassword}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {error && <ErrorText>{error}</ErrorText>}
            <Button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reset Password
            </Button>
            <SwitchText>
              Remember your password?
              <SwitchLink onClick={() => setMode('login')}>Login</SwitchLink>
            </SwitchText>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={onClose}
        >
          <ModalContent
            theme={theme}
            onClick={e => e.stopPropagation()}
          >
            {renderForm()}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

const ErrorText = styled.p`
  color: #ff4444;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  text-align: center;
`;

export default AuthModal; 