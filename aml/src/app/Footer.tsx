import './Footer.css';
export async function Footer() {
  return (
    <div>
    <footer>
      <p>&copy; {new Date().getFullYear()} Advanced Media Library</p>
      <ul id="leftList">
        <li>About</li>
        <li><a href="#">Copyrights</a></li>
        <li><a href="#">Contact us</a></li>
        <li><a href="#">ghsdfdfsg</a></li>g
        </ul>    
        <ul>
          <li><a href="#">dfghjfmd</a></li>
          <li><a href="#">dfhafgb</a></li>
          <li><a href="#">khsdds</a></li>
          <li><a href="#">dhkgds</a></li>
      </ul>
      <ul id="rightList">
          <li><a href="#">dfghjfmd</a></li>
          <li><a href="#">dfhafgb</a></li>
          <li><a href="#">khsdds</a></li>
          <li><a href="#">dhkgds</a></li>
      </ul>
    </footer>
  </div>
  );
}