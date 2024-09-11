const Login = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="w-3/5 bg-white rounded flex flex-col items-center shadow-md px-8 pt-6 pb-8 mb-4">
            <h1 className="text-gray-700 text-3xl font-bold mb-6">Welcome Back!</h1>
            <form className="w-full">
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="me@exe-coll.ac.uk" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                Login
              </button>
            </form>

          </div>
        </div>
    )
}

export default Login;