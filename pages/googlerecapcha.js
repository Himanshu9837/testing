
import ReCAPTCHA from "react-google-recaptcha";
const Googlerecapcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  return (
    <div className="App">
      <ReCAPTCHA
        sitekey="6LdJKhQhAAAAAOofKeXJs7HYqsUzEgBjsCvqpBkL"
        onChange={onChange}
      />
    </div>
  );
};
export default Googlerecapcha;