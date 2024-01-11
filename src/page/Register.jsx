import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import auth from "../config/firebase/firebase.config";

const Register = () => {
   const {register} = useAuth();
   const navigate = useNavigate()

   const handleRegister = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const pass = form.pass.value;
      console.log(email, pass)

      // login function in here call 
      register(email, pass)
         .then(result => {
            updateProfile(auth.currentUser, {
               displayName: name
            }).then(() => {
               console.log('register result: ',result);
               // clear form value 
               form.reset();
               toast.success('Successfully Register!');
               // success to get home 
               navigate('/login');
               
            }).catch((error) => {
               console.log(error)
            });
         })
         .catch(err => {
            toast.error(`${err.message}`)
         });
   }

   return (
      <div>
        {/* form container  */}
        <div className="w-full p-5 md:p-16 flex items-center justify-center">
           <form onSubmit={handleRegister} className="max-w-xl w-full border-2 p-3 md:p-5 rounded-2xl">
              {/* text content  */}
              <div className="text-center mb-5">
                 <h1 className="text-xl pb-3 capitalize border-b-2 border-[#FF3811] inline font-semibold ">Register page</h1>
              </div>
              <div className="form-control">
                 <label className="label">
                    <span className="label-text">Name</span>
                 </label>
                 <input
                    type="text"
                    name="name"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    />
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
                 <button type="submit" className="btn btn-primary">SingUp</button>
              </div>
              {/* move control div  */}
              <div>
               <button type="button" className="text-base font-medium">Already you have account? <Link to='/login' className="text-green-500">Login</Link>
               </button>
              </div>
           </form>
        </div>
      </div>
   );
};

export default Register;