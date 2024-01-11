import PropTypes from 'prop-types'; // ES6

const Container = ({children}) => {
   return (
      <div className='max-w-screen-xl mx-auto p-6 md:p-0'>
         {children}
      </div>
   );
};

export default Container;
Container.propTypes = {
   children: PropTypes.node,
}