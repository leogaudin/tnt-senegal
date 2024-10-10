import React, { useEffect, useState } from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	Collapse,
	Flex,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { palette } from '../../theme';
import { callAPI, user } from '../../service';
import { useNavigate } from 'react-router-dom';
import { sha512 } from 'js-sha512';
import { useTranslation } from 'react-i18next';

export default function Login() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		if (user)
			navigate('/');
	}, []);

	const [showPassword, setShowPassword] = useState(false);
	const [showFullForm, setShowFullForm] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [loading, setLoading] = useState(false);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleAuth = () => {
		if (!username.length || !password.length)
			return;
		const user = {
			username,
			displayName: username,
			password: sha512(password),
		};
		setLoading(true);
		callAPI('POST', userExists ? 'login' : 'register', user)
			.then(res => res.json())
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res['user']));
				window.location.reload();
			})
			.catch(e => alert(t('authError')))
			.finally(() => setLoading(false));
	}

	const checkIfExists = () => {
		if (!username.length)
			return;
		setLoading(true);
		callAPI('POST', 'login', { username, password: '42' })
			.then((res) => {
				setUserExists(res.status !== 404);
				setShowFullForm(true);
			})
			.catch(e => {
				setUserExists(false);
				setShowFullForm(true);
			})
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		if (showFullForm)
			document.getElementById('password').focus();
	}, [showFullForm]);

	return (
		<Flex height='100vh'>
			<Flex
				width='xs'
				mx='auto'
				direction='column'
				justify='center'
			>
				<FormControl my={2} id='username' isRequired>
					<FormLabel>{t('username')}</FormLabel>
					<Input
						disabled={showFullForm}
						width='100%'
						focusBorderColor={palette.primary.main}
						type='text'
						value={username}
						onChange={handleUsernameChange}
						onKeyDown={e=> {
							if (e.key === 'Enter') {
								checkIfExists();
							}
						}}
					/>
				</FormControl>
				<Collapse in={showFullForm}>
					<FormControl my={2} id='password' isRequired>
						<FormLabel>{t('password')}</FormLabel>
						<InputGroup>
							<Input
								width='100%'
								focusBorderColor={palette.primary.main}
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={handlePasswordChange}
								onKeyDown={e=> {
									if (e.key === 'Enter') {
										handleAuth();
									}
								}}
							/>
							<InputRightElement h='full'>
								<Button
									variant='ghost'
									onClick={() => setShowPassword((showPassword) => !showPassword)}>
									{showPassword ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
				</Collapse>
				<Button
					mt={2}
					isLoading={loading}
					size='lg'
					color={palette.background}
					bg={palette.primary.main}
					_hover={{ bg: palette.primary.dark }}
					onClick={
						showFullForm
							? handleAuth
							: checkIfExists
					}
					width='100%'
				>
					{
						showFullForm
						? (
							userExists
							? `${t('welcomeBack')} ${t('login')}`
							: t('createNewAccount')
						)
						: t('continue')
					}
				</Button>
				{showFullForm && (
					<Button
						colorScheme='gray'
						onClick={() => setShowFullForm(false)}
						mt={2}
					>
						{t('goBack')}
					</Button>
				)}
			</Flex>
		</Flex>
	);
}
