// src/pages/Analysis.js
import React from 'react';
import '../styles/Analysis.css';  // Adjust path based on where the CSS file is located


function Analysis() {
  return (
    <section id="analysis" className="layered-section">
      <div className="section-content">
        <h2>Team Stats from Last Season</h2>
        <p>Below are the performance stats of 25 NBA teams from the last season:</p>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>ORTG</th>
              <th>GP</th>
              <th>MPG</th>
              <th>PPG</th>
              <th>RPG</th>
              <th>APG</th>
              <th>SPG</th>
              <th>BPG</th>
              <th>FG%</th>
              <th>3P%</th>
              <th>FT%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Dallas Mavericks</td><td>108.7</td><td>82</td><td>241.7</td><td>103.9</td><td>42.6</td><td>22.6</td><td>7.4</td><td>4.7</td><td>46.1%</td><td>35.6%</td><td>77.2%</td></tr>
            <tr><td>Los Angeles Lakers</td><td>108.4</td><td>82</td><td>241.7</td><td>106.9</td><td>44.3</td><td>25.0</td><td>8.3</td><td>5.5</td><td>47.6%</td><td>34.6%</td><td>74.7%</td></tr>
            <tr><td>San Antonio Spurs</td><td>108.2</td><td>82</td><td>241.6</td><td>105.4</td><td>43.8</td><td>24.5</td><td>8.0</td><td>5.7</td><td>47.7%</td><td>36.2%</td><td>75.5%</td></tr>
            <tr><td>New Orleans Pelicans</td><td>107.9</td><td>82</td><td>241.8</td><td>101.8</td><td>42.9</td><td>22.7</td><td>7.6</td><td>4.7</td><td>45.7%</td><td>35.7%</td><td>76.5%</td></tr>
            <tr><td>Toronto Raptors</td><td>107.8</td><td>82</td><td>241.9</td><td>101.2</td><td>41.9</td><td>22.1</td><td>7.8</td><td>5.1</td><td>45.1%</td><td>35.9%</td><td>77.0%</td></tr>
            <tr><td>Denver Nuggets</td><td>107.7</td><td>82</td><td>241.6</td><td>107.8</td><td>44.2</td><td>24.6</td><td>8.5</td><td>5.4</td><td>46.5%</td><td>34.7%</td><td>76.0%</td></tr>
            <tr><td>Phoenix Suns</td><td>107.7</td><td>82</td><td>241.5</td><td>107.2</td><td>43.3</td><td>25.2</td><td>8.4</td><td>4.9</td><td>47.6%</td><td>35.9%</td><td>76.5%</td></tr>
            <tr><td>Portland Trail Blazers</td><td>107.7</td><td>82</td><td>241.7</td><td>104.9</td><td>43.9</td><td>23.4</td><td>8.1</td><td>5.0</td><td>46.7%</td><td>35.5%</td><td>75.6%</td></tr>
            <tr><td>Oklahoma City Thunder</td><td>107.5</td><td>82</td><td>241.7</td><td>105.1</td><td>43.6</td><td>23.2</td><td>8.8</td><td>5.0</td><td>46.5%</td><td>35.3%</td><td>75.9%</td></tr>
            <tr><td>Boston Celtics</td><td>107.3</td><td>82</td><td>241.7</td><td>105.1</td><td>43.8</td><td>24.3</td><td>8.1</td><td>4.8</td><td>46.9%</td><td>35.6%</td><td>77.3%</td></tr>
            <tr><td>Utah Jazz</td><td>107.2</td><td>82</td><td>241.4</td><td>103.8</td><td>43.3</td><td>24.5</td><td>8.1</td><td>5.5</td><td>47.2%</td><td>35.5%</td><td>76.1%</td></tr>
            <tr><td>Houston Rockets</td><td>107.1</td><td>82</td><td>241.6</td><td>104.6</td><td>43.8</td><td>23.5</td><td>8.1</td><td>5.1</td><td>46.4%</td><td>34.9%</td><td>75.6%</td></tr>
            <tr><td>Golden State Warriors</td><td>107.1</td><td>82</td><td>241.5</td><td>107.3</td><td>44.4</td><td>24.3</td><td>8.8</td><td>5.1</td><td>46.6%</td><td>36.2%</td><td>75.4%</td></tr>
            <tr><td>Milwaukee Bucks</td><td>107.1</td><td>82</td><td>241.7</td><td>104.3</td><td>42.8</td><td>24.0</td><td>8.4</td><td>4.9</td><td>46.9%</td><td>35.7%</td><td>75.8%</td></tr>
            <tr><td>Indiana Pacers</td><td>106.7</td><td>82</td><td>241.6</td><td>103.6</td><td>43.2</td><td>23.6</td><td>8.0</td><td>5.1</td><td>46.5%</td><td>35.7%</td><td>76.8%</td></tr>
            <tr><td>Minnesota Timberwolves</td><td>106.6</td><td>82</td><td>241.7</td><td>101.0</td><td>42.0</td><td>23.3</td><td>7.7</td><td>5.1</td><td>45.6%</td><td>34.7%</td><td>77.0%</td></tr>
            <tr><td>Miami Heat</td><td>106.5</td><td>82</td><td>241.9</td><td>99.5</td><td>41.9</td><td>21.9</td><td>7.6</td><td>4.8</td><td>46.0%</td><td>35.8%</td><td>74.5%</td></tr>
            <tr><td>Orlando Magic</td><td>106.5</td><td>82</td><td>241.5</td><td>101.2</td><td>42.8</td><td>22.0</td><td>7.5</td><td>4.8</td><td>45.5%</td><td>35.3%</td><td>73.5%</td></tr>
            <tr><td>Atlanta Hawks</td><td>106.3</td><td>82</td><td>241.7</td><td>102.7</td><td>43.3</td><td>22.7</td><td>8.3</td><td>5.0</td><td>46.0%</td><td>35.0%</td><td>76.2%</td></tr>
            <tr><td>Charlotte Hornets</td><td>106.0</td><td>82</td><td>241.9</td><td>100.7</td><td>41.7</td><td>23.4</td><td>7.8</td><td>4.8</td><td>45.2%</td><td>35.5%</td><td>75.6%</td></tr>
            <tr><td>Detroit Pistons</td><td>105.9</td><td>82</td><td>241.8</td><td>99.9</td><td>43.0</td><td>23.1</td><td>7.6</td><td>4.9</td><td>45.7%</td><td>34.9%</td><td>73.8%</td></tr>
            <tr><td>Brooklyn Nets</td><td>105.8</td><td>82</td><td>241.8</td><td>101.2</td><td>42.6</td><td>24.5</td><td>7.5</td><td>4.9</td><td>46.8%</td><td>35.9%</td><td>75.3%</td></tr>
            <tr><td>Philadelphia 76ers</td><td>105.7</td><td>82</td><td>241.7</td><td>108.1</td><td>43.4</td><td>23.5</td><td>7.9</td><td>4.7</td><td>47.3%</td><td>36.3%</td><td>77.4%</td></tr>
            <tr><td>Washington Wizards</td><td>105.5</td><td>82</td><td>241.7</td><td>104.3</td><td>42.0</td><td>24.3</td><td>7.6</td><td>5.0</td><td>45.4%</td><td>34.8%</td><td>74.9%</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Analysis;
