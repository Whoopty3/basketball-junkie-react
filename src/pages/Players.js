// src/pages/Players.js
import React from 'react';
import '../styles/Players.css';  // Adjust based on your folder structure


function Players() {
  return (
    <section id="player-profiles" className="layered-section">
      <div className="section-content">
        <h2>Player Profiles</h2>
        <img src="/images/Player-profiles-small.jpg" alt="Player Profiles" />
        <p>Here are the stats for 25 top NBA players:</p>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Points Per Game (PPG)</th>
              <th>Assists Per Game (APG)</th>
              <th>Rebounds Per Game (RPG)</th>
              <th>Field Goal Percentage (FG%)</th>
              <th>3-Point Percentage (3P%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>LeBron James</td><td>25.7</td><td>7.9</td><td>7.4</td><td>50%</td><td>35%</td></tr>
            <tr><td>Stephen Curry</td><td>29.3</td><td>6.2</td><td>5.5</td><td>47%</td><td>43%</td></tr>
            <tr><td>Kevin Durant</td><td>28.7</td><td>5.5</td><td>7.1</td><td>52%</td><td>38%</td></tr>
            <tr><td>Giannis Antetokounmpo</td><td>31.2</td><td>5.6</td><td>11.6</td><td>55%</td><td>29%</td></tr>
            <tr><td>Luka Dončić</td><td>32.4</td><td>8.2</td><td>8.7</td><td>49%</td><td>35%</td></tr>
            <tr><td>Joel Embiid</td><td>33.1</td><td>4.2</td><td>10.2</td><td>54%</td><td>34%</td></tr>
            <tr><td>Nikola Jokić</td><td>24.5</td><td>9.8</td><td>11.8</td><td>63%</td><td>38%</td></tr>
            <tr><td>Kawhi Leonard</td><td>24.9</td><td>6.5</td><td>6.2</td><td>52%</td><td>39%</td></tr>
            <tr><td>James Harden</td><td>21.0</td><td>10.7</td><td>6.1</td><td>45%</td><td>38%</td></tr>
            <tr><td>Jayson Tatum</td><td>30.1</td><td>4.6</td><td>8.8</td><td>46%</td><td>35%</td></tr>
            <tr><td>Ja Morant</td><td>26.2</td><td>8.1</td><td>5.9</td><td>46%</td><td>32%</td></tr>
            <tr><td>Trae Young</td><td>26.2</td><td>10.2</td><td>3.0</td><td>43%</td><td>33%</td></tr>
            <tr><td>Devin Booker</td><td>27.8</td><td>5.5</td><td>4.5</td><td>49%</td><td>35%</td></tr>
            <tr><td>Anthony Davis</td><td>25.9</td><td>2.6</td><td>12.5</td><td>56%</td><td>26%</td></tr>
            <tr><td>Damian Lillard</td><td>32.2</td><td>7.3</td><td>4.8</td><td>46%</td><td>37%</td></tr>
            <tr><td>Jimmy Butler</td><td>22.9</td><td>5.3</td><td>5.9</td><td>53%</td><td>35%</td></tr>
            <tr><td>DeMar DeRozan</td><td>24.5</td><td>5.1</td><td>4.6</td><td>50%</td><td>32%</td></tr>
            <tr><td>Zion Williamson</td><td>26.8</td><td>4.6</td><td>7.0</td><td>61%</td><td>29%</td></tr>
            <tr><td>Bradley Beal</td><td>23.2</td><td>5.4</td><td>3.9</td><td>51%</td><td>37%</td></tr>
            <tr><td>Kyrie Irving</td><td>27.1</td><td>5.5</td><td>4.8</td><td>49%</td><td>39%</td></tr>
            <tr><td>Jaylen Brown</td><td>26.6</td><td>3.5</td><td>6.9</td><td>49%</td><td>33%</td></tr>
            <tr><td>Paul George</td><td>23.8</td><td>5.1</td><td>6.1</td><td>45%</td><td>37%</td></tr>
            <tr><td>Pascal Siakam</td><td>24.2</td><td>5.8</td><td>7.8</td><td>48%</td><td>32%</td></tr>
            <tr><td>Julius Randle</td><td>25.1</td><td>4.1</td><td>10.0</td><td>46%</td><td>34%</td></tr>
            <tr><td>Shai Gilgeous-Alexander</td><td>31.4</td><td>5.5</td><td>4.8</td><td>51%</td><td>35%</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Players;
