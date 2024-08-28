import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ReactForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [count, setCount] = useState(0);

	const changeCount = () => {
		setCount(count + 1);
	};

	const onSubmit = data => {
		console.log(data);
		// Handle form submission (e.g., send data to server)
	};

	return (
		<div>
			<h2>User Information Form</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<h1>{count}</h1>
					<label htmlFor="name">Name:</label>
					<input id="name" {...register('name', { required: true, minLength: 2 })} />
					{errors.name && errors.name.type === 'required' && <p>Name is required.</p>}
					{errors.name && errors.name.type === 'minLength' && <p>Name must be at least 2 characters long.</p>}
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						{...register('email', {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						})}
					/>
					{errors.email && errors.email.type === 'required' && <p>Email is required.</p>}
					{errors.email && errors.email.type === 'pattern' && <p>Email is not valid.</p>}
				</div>
				<div>
					<label htmlFor="age">Age:</label>
					<input id="age" type="number" {...register('age', { required: true, min: 1 })} />
					{errors.age && errors.age.type === 'required' && <p>Age is required.</p>}
					{errors.age && errors.age.type === 'min' && <p>Age must be at least 1.</p>}
				</div>
				<div>
					<button onClick={changeCount}>Count</button>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default ReactForm;
