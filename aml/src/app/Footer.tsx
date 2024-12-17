import './Footer.css';
export async function Footer() {
  return (
    <footer>
      <p>  Advanced Media Library {new Date().getFullYear()} &copy;</p>
      <ul id="leftList">
        <li>About</li>
        <li><a href="#">Copyrights</a></li>
        <li><a href="#">Contact us</a></li>
        <li><a href="#">Common FAQs</a></li>
        </ul>    
        <ul>
          <li>Legal</li>
          <li><a href="#">Privacy notice</a></li>
          <li><a href="#">Use of Cookies</a></li>
          <li><a href="#">Accessibility Statement</a></li>
      </ul>
      <ul id="rightList">
          <li>Socials</li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">LinkedIn</a></li>
      </ul>
    </footer>
  );
}