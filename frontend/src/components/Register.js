import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            problems: {}
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validate = () => {
        const problems = {};

        if (!this.state.username) {
            problems.username = "Username is empty";
        }

        if (!this.state.password) {
            problems.password = "Password is empty";
        } else if (this.state.password.length < 5) {
            problems.password = "Password is less than 5 characters";
        }

        if (!this.state.email) {
            problems.email = "Email is empty";
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            problems.email = "Email is invalid";
        }

        this.setState({ problems });
        return Object.keys(problems).length === 0;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validate()) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email
                    })
                });
                if (response.ok) {
                    console.log('User registered successfully');
                } else {
                    console.log('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            this.setState((prevState) => {
                console.log(prevState.problems);
                return prevState;
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="bg-primary rounded-lg p-8 flex flex-col space-y-4 w-full max-w-md mx-auto">
                <div className="flex flex-col">
                    <label htmlFor="usernameRegister" className="text-white mb-2">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="usernameRegister"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.username && <span className="text-red-500 mt-1">{this.state.problems.username}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passwordRegister" className="text-white mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="passwordRegister"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.password && <span className="text-red-500 mt-1">{this.state.problems.password}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="emailRegister" className="text-white mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="emailRegister"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="p-2 rounded border border-gray-300"
                    />
                    {this.state.problems.email && <span className="text-red-500 mt-1">{this.state.problems.email}</span>}
                </div>
                <button type="submit" className="bg-white text-secondary py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    Register
                </button>
            </form>
        );
    }
}

export default Register;