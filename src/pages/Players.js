import React from "react";

const Players = () => {
  // Player data - 34 players
  const players = [
    { id: 1, name: "LeBron James", team: "Los Angeles Lakers", points: 25.0, assists: 7.8, rebounds: 7.8 },
    { id: 2, name: "Stephen Curry", team: "Golden State Warriors", points: 30.1, assists: 6.6, rebounds: 5.3 },
    { id: 3, name: "Kevin Durant", team: "Brooklyn Nets", points: 27.0, assists: 5.3, rebounds: 7.1 },
    { id: 4, name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", points: 29.9, assists: 5.9, rebounds: 11.6 },
    { id: 5, name: "Kawhi Leonard", team: "Los Angeles Clippers", points: 25.7, assists: 5.2, rebounds: 6.5 },
    { id: 6, name: "James Harden", team: "Philadelphia 76ers", points: 22.0, assists: 10.7, rebounds: 8.1 },
    { id: 7, name: "Luka Dončić", team: "Dallas Mavericks", points: 28.0, assists: 8.7, rebounds: 9.2 },
    { id: 8, name: "Joel Embiid", team: "Philadelphia 76ers", points: 30.5, assists: 4.2, rebounds: 11.6 },
    { id: 9, name: "Nikola Jokić", team: "Denver Nuggets", points: 26.4, assists: 8.3, rebounds: 10.8 },
    { id: 10, name: "Jimmy Butler", team: "Miami Heat", points: 21.5, assists: 5.2, rebounds: 6.9 },
    { id: 11, name: "Anthony Davis", team: "Los Angeles Lakers", points: 22.5, assists: 2.5, rebounds: 9.0 },
    { id: 12, name: "Jayson Tatum", team: "Boston Celtics", points: 26.9, assists: 4.3, rebounds: 8.0 },
    { id: 13, name: "Donovan Mitchell", team: "Cleveland Cavaliers", points: 25.5, assists: 4.4, rebounds: 4.0 },
    { id: 14, name: "Devin Booker", team: "Phoenix Suns", points: 26.0, assists: 5.3, rebounds: 4.2 },
    { id: 15, name: "Zion Williamson", team: "New Orleans Pelicans", points: 25.0, assists: 3.5, rebounds: 7.0 },
    { id: 16, name: "Chris Paul", team: "Phoenix Suns", points: 14.7, assists: 10.5, rebounds: 4.4 },
    { id: 17, name: "Kyrie Irving", team: "Dallas Mavericks", points: 27.4, assists: 5.3, rebounds: 5.0 },
    { id: 18, name: "Trae Young", team: "Atlanta Hawks", points: 25.0, assists: 9.4, rebounds: 3.9 },
    { id: 19, name: "LaMelo Ball", team: "Charlotte Hornets", points: 20.1, assists: 8.0, rebounds: 6.9 },
    { id: 20, name: "Jrue Holiday", team: "Milwaukee Bucks", points: 17.7, assists: 7.3, rebounds: 5.1 },
    { id: 21, name: "Pascal Siakam", team: "Toronto Raptors", points: 22.8, assists: 5.5, rebounds: 8.5 },
    { id: 22, name: "Bam Adebayo", team: "Miami Heat", points: 19.0, assists: 5.0, rebounds: 10.2 },
    { id: 23, name: "Rudy Gobert", team: "Minnesota Timberwolves", points: 12.4, assists: 1.1, rebounds: 11.6 },
    { id: 24, name: "DeMar DeRozan", team: "Chicago Bulls", points: 25.3, assists: 4.2, rebounds: 5.2 },
    { id: 25, name: "Carmelo Anthony", team: "Los Angeles Lakers", points: 13.3, assists: 1.2, rebounds: 4.5 },
    { id: 26, name: "Vince Carter", team: "Retired", points: 16.7, assists: 3.1, rebounds: 4.3 },
    { id: 27, name: "Kyle Lowry", team: "Miami Heat", points: 13.1, assists: 7.3, rebounds: 4.5 },
    { id: 28, name: "Fred VanVleet", team: "Toronto Raptors", points: 19.6, assists: 7.0, rebounds: 4.0 },
    { id: 29, name: "Jonas Valančiūnas", team: "New Orleans Pelicans", points: 17.0, assists: 2.1, rebounds: 11.6 },
    { id: 30, name: "Tyrese Haliburton", team: "Indiana Pacers", points: 20.2, assists: 10.6, rebounds: 4.0 },
    { id: 31, name: "Clint Capela", team: "Atlanta Hawks", points: 12.0, assists: 0.9, rebounds: 10.5 },
    { id: 32, name: "Jaren Jackson Jr.", team: "Memphis Grizzlies", points: 18.6, assists: 1.2, rebounds: 6.8 },
    { id: 33, name: "Michael Porter Jr.", team: "Denver Nuggets", points: 17.0, assists: 1.2, rebounds: 5.5 },
    { id: 34, name: "D'Angelo Russell", team: "Los Angeles Lakers", points: 18.1, assists: 5.9, rebounds: 3.7 },
  ];

  return (
    <div>
      <h1>Players List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Points</th>
            <th>Assists</th>
            <th>Rebounds</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.points}</td>
              <td>{player.assists}</td>
              <td>{player.rebounds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
