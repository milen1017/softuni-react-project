<h1>Project Setup</h1>

<h2>Prerequisites</h2>
<ul>
  <li>Node.js installed</li>
  <li>MongoDB connection string</li>
</ul>

<h2>Running the Client</h2>
<ol>
  <li>Navigate to the client directory: <code>cd client</code></li>
  <li>Install dependencies: <code>npm install</code></li>
  <li>Start the client: <code>npm run dev</code></li>
  <li>Access at <a href="http://localhost:5173/">http://localhost:5173/</a></li>
</ol>

<h2>Running the Server</h2>
<ol>
  <li>Navigate to the server directory: <code>cd server</code></li>
  <li>Install dependencies: <code>npm install</code></li>
  <li>Start the server: <code>npm start</code></li>
  <li>Server runs at <a href="http://localhost:3000">http://localhost:3000</a></li>
</ol>

<h2>Environment Variables</h2>
<p>Create a <code>.env</code> file in the server directory with these variables:</p>

<pre>
PORT=3000
DB_CONNECTION="localhost:27017"
</pre>

<p>Replace values with your own configurations if needed.</p>
