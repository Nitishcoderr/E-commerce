import React from 'react'
import './Footer.css'
import playStore from '../../../Image/playstore.png'
import appStore from '../../../Image/appstore.png'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>TrendHub</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Nitish</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://instagram.com">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer
