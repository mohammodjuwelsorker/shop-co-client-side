import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
// import useAxios from "../hooks/useAxios";

const Login = () => {
   const {login} = useAuth();
   const navigate = useNavigate();
   // const axios = useAxios();
   const handleLogin = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const pass = form.pass.value;
      console.log(email, pass)

      // login function in here call 
      login(email, pass)
         .then(result => {
            console.log('login result: ', result.user?.email)

            // clear form 
            form.reset();
            toast.success('login successfully?');
            // go to home page 
            navigate('/');
            
         })
         .catch(err => {
            toast.error(err.message)
         });
   }
  return (
    <div>
      {/* form container  */}
      <div className="w-full p-5 md:p-16 flex items-center justify-center">
         <form onSubmit={handleLogin} className="max-w-xl w-full border-2 p-3 md:p-5 rounded-2xl">
            {/* text content  */}
            <div className="text-center mb-5">
               <h1 className="text-xl pb-3 capitalize border-b-2 border-[#FF3811] inline font-semibold ">Login page</h1>
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  />
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Password</span>
               </label>
               <input
                  type="password"
                  name="pass"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  />
               <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                  </a>
               </label>
            </div>
            <div className="form-control mt-6 mb-6">
               <button type="submit" className="btn btn-primary">Login</button>
            </div>
            {/* social login  */}
            <div className="mb-5">
               <button type="button" className="btn text-xl font-semibold capitalize">google login</button>
            </div>
            {/* move control div  */}
            <div>
               <button type="button" className="text-base font-medium">your {"don't"} have account? <Link to='/register' className="text-green-500">Register</Link>
               </button>
              </div>
         </form>
      </div>
    </div>
  );
};

export default Login;
