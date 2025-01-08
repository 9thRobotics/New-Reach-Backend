git add .
git commit -m "Fix: Add missing dependencies including 'celebrate'"
git push heroku main
heroku builds:cache:purge -a new-reach-backend
heroku builds:cache:purge -a new-reach-backend
heroku logs --tail -a new-reach-backend
git add .
git commit -m "Added MongoDB connection"
git push heroku main
heroku logs --tail -a new-reach-backend
npm install mongoose
git add .
git commit -m "Added MongoDB connection"
git push heroku main
heroku logs --tail -a new-reach-backend
[200~npm install mongoose
git add .
git commit -m "Added MongoDB connection"
git push heroku main
heroku logs --tail -a new-reach-backend
npm install celebrate
git add package.json package-lock.json
git commit -m "Add celebrate package"
git push heroku main
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
npm install mongoose dotenv
node testMongoConnection.js
cd path/to/your/project
node testMongoConnection.js
npm install mongoose dotenv
node testMongoConnection.js
cd path/to/your/project
ls
node testMongoConnection.js
cd path/to/your/New-Reach-Backend
ls
mv /path/to/testMongoConnection.js .
node testMongoConnection.js
cd path/to/your/New-Reach-Backend
ls
node testMongoConnection.js
npm install
heroku config:set MONGO_URI="your_mongo_connection_string" -a new-reach-backend
npm install celebrate
git add .
git commit -m "Fix backend and deploy"
git push heroku main
heroku logs --tail -a new-reach-backend
git add .
git commit -m "Fix backend and deploy"
git push heroku main
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
git add .
git commit -m "Fix backend and deploy"
git push heroku main
heroku logs --tail -a new-reach-backend
heroku config
heroku restart -a new-reach-backend
[200~heroku logs --tail -a new-reach-backend
heroku logs --tail -a new-reach-backend
nslookup -debug -q=SRV  _mongodb._tcp.<DNS SRV name>
nslookup -debug -q=SRV _mongodb._tcp.cluster0.mongodb.net
nslookup -debug -q=SRV _mongodb._tcp.cluster0.mongodb.net 8.8.8.8
dig _mongodb._tcp.cluster0.mongodb.net SRV
nslookup _mongodb._tcp.cluster0.mongodb.net 8.8.8.8
node testMongoConnection.js
node testMongoConnection.js
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
node testMongoConnection.js
heroku config:set MONGO_URI="mongodb+srv://phillipdfilkins:securePass123@cluster0.yt6an.mongodb.net/reach_database?retryWrites=true&w=majority"
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
heroku config
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
[200~heroku logs --tail -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku logs --tail -a new-reach-backend-d530ec69bf02
heroku logs --tail -a new-reach-backend
heroku ps -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku config -a new-reach-backend
curl https://new-reach-backend-d530ec69bf02.herokuapp.com/
git push heroku main
heroku ps -a new-reach-backend
heroku ps:scale web=2 -a new-reach-backend
npx create-react-app 9th-dimension-frontend
# or for Next.js
npx create-next-app@latest 9th-dimension-frontend
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
npx create-react-app my-frontend
cd my-frontend
npm start
npm start
ls
npx create-react-app my-frontend
node -v
npm -v
git clone https://github.com/9thRobotics/Reach-Frontend.git
cd Reach-Frontend
npm install
npm start
npm install
npm start
VITE_BACKEND_URL=https://new-reach-backend.herokuapp.com
git add .
git commit -m "Connect frontend to backend"
git push origin main
git pull origin main
git add <file>
git commit -m "Resolve merge conflicts"
git push origin main
git rm --cached reach-frontend
cp -r reach-frontend/* .  # Move files into the main repository
git add .
git commit -m "Include frontend code directly"
git push origin main
cp -r Reach-Frontend/* Reach-Backend/frontend/
cd Reach-Backend
git add frontend
git commit -m "Add frontend code"
git push origin main
git submodule add https://github.com/9thRobotics/Reach-Frontend.git frontend
git commit -m "Add frontend as a submodule"
git push origin main
git submodule update --init --recursive
git add <file>
git add .
git commit -m "Resolve merge conflicts and add frontend submodule"
git rm -r --cached frontend
rm -rf frontend
git submodule add https://github.com/9thRobotics/Reach-Frontend.git frontend
git commit -m "Add frontend as a submodule"
git submodule update --init --recursive
git pull origin main --rebase
git push origin main
git clone --recursive https://github.com/9thRobotics/Reach-Backend.git
git clone --recursive https://github.com/9thRobotics/Reach-Backend.git --depth 1
git -c http.postBuffer=524288000 clone --recursive https://github.com/9thRobotics/Reach-Backend.git
git clone https://github.com/9thRobotics/Reach-Backend.git
git submodule update --init --recursive
git clone --depth 1 https://github.com/9thRobotics/Reach-Backend.git
git fetch --unshallow
git submodule update --init --recursive
rm -rf Reach-Backend
git clone --recursive https://github.com/9thRobotics/Reach-Backend.git
git submodule update --init --recursive
cd Reach-Backend
ls -la
npm install
npm start
cd ../frontend
npm install
npm start
npm start
cd Reach-Frontend
touch src/config.js
heroku apps
git push heroku main
heroku logs --tail -a new-reach-backend
npm start
git push heroku main
heroku config:set PORT=5000 -a <app-name>
git push heroku main
curl https://new-reach-backend.herokuapp.com/
heroku apps
heroku create new-reach-backend
heroku create new-reach-backend
heroku logs --tail -a new-reach-backend
git push heroku main
heroku config -a new-reach-backend
npm start
heroku restart -a new-reach-backend
curl https://new-reach-backend.herokuapp.com/
git add .
git commit -m "Fix start script"
git push heroku main
heroku git:remote -a new-reach-backend
git remote -v
git rm --cached reach-frontend
rm -rf .git/modules/reach-frontend
git add reach-frontend
git commit -m "Remove submodule and add frontend as a folder"
heroku logs --tail -a new-reach-backend
[200~git add .
git commit -m "Fix backend deployment"
git push heroku main
git pull heroku main
git add <file-with-conflict>
git commit -m "Resolve merge conflicts"
git add .
git commit -m "Fix backend deployment"
git push heroku main
heroku logs --tail -a new-reach-backend
git pull heroku main --rebase
git add <file>
git rebase --continue
git push heroku main
curl https://new-reach-backend.herokuapp.com/
curl https://new-reach-backend.herokuapp.com/api/test
npm start
npm start
npm install --legacy-peer-deps
npm install
npm install --legacy-peer-deps && npm run build
npm install
npm run build
npm install
npm run build
npm install -g yarn
yarn install
yarn build
yarn install && yarn build
npm install
npm run build
npm install
npm run build
npm install --legacy-peer-deps && npm run build
rm -rf node_modules package-lock.json
npm install
npm install --legacy-peer-deps && npm run build
npm install
npm run build
npm run build
npm run preview
cd ~/Reach-Frontend
npm run build
npm install
npm install --legacy-peer-deps
npm install vite@^3.0.0
npm install @vitejs/plugin-react@latest
npm install --legacy-peer-deps
rm -rf node_modules
npm install
npm install -g vercel
vercel
npm install -g vercel
vercel
vercel
rm -rf node_modules package-lock.json
npm install
vercel
npm install vite@latest @vitejs/plugin-react@latest
rm -rf node_modules package-lock.json
npm install
npm install
npm run dev
npm install
npm run dev
node -v
cd Reach-Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
npm install
npm run dev
npm install vite @vitejs/plugin-react --save-dev
git add package-lock.json package.json
git commit -m "Update dependencies"
git clone https://github.com/9thRobotics/Reach-Frontend.git
cd Reach-Frontend
rm -rf node_modules
npm install
npm run dev
git add package-lock.json package.json
git commit -m "Regenerate package-lock.json"
git push origin main
npm install
rm -rf node_modules
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
git add .
git commit -m "Update package-lock.json and fix node_modules issues"
git pull origin main --rebase
git add <resolved-file>
git rebase --continue
git push origin main
node_modules/
.cache/
git rm -r --cached node_modules
git rm -r --cached .cache
git add .gitignore
git commit -m "Update .gitignore and remove unnecessary tracked files"
git push origin main
git pull origin main --rebase
git add <file-with-conflict>
git rebase --continue
git add .
git commit -m "Update .gitignore and sync with remote"
git push origin main
git pull origin main --rebase
git add <file-with-conflict>
git rebase --continue
git push origin main
git add vite.config.js
git commit -m "Update vite.config.js to use environment variables"
git push origin main
git pull origin main
npm install @vitejs/plugin-react@latest
npm install --legacy-peer-deps
npm install @vitejs/plugin-react@latest
npm install --legacy-peer-deps
heroku logs --tail -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
new-reach-backend-d530ec69bf02.herokuapp.com
https://reach-backend.herokuapp.com
heroku logs --tail -a new-reach-backend-d530ec69bf02
heroku logs --tail -a new-reach-backend
curl -X GET https://new-reach-backend.herokuapp.com/api/tokens
[200~git push heroku main
heroku ps:scale web=1 -a new-reach-backend
heroku logs --tail -a new-reach-backend
npm install
npm start
heroku plugins:install heroku-repo
heroku repo:purge_cache -a <your-app-name>
git push heroku main
curl -X GET https://new-reach-backend.herokuapp.com/api/tokens
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' https://new-reach-backend.herokuapp.com/api/tokens/purchase
heroku logs --tail -a new-reach-backend
npm start
heroku plugins:install heroku-repo
heroku repo:purge_cache -a <your-app-name>
git push heroku main
curl -X GET https://new-reach-backend.herokuapp.com/api/tokens
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' https://new-reach-backend.herokuapp.com/api/tokens/purchase
heroku logs --tail -a new-reach-backend
git add .
git commit -m "Fix missing routes"
git push heroku main
npm install
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push heroku main
npm start
heroku plugins:install heroku-repo
heroku repo:purge_cache -a new-reach-backend
git push heroku main
curl -X POST -H "Content-Type: application/json"   -d '{"tokenId":"123","buyer":"0xAddress"}'   https://new-reach-backend.herokuapp.com/api/tokens/purchase
heroku logs --tail -a new-reach-backend
heroku addons:create quotaguardstatic
git add .
git commit -m "Add QuotaGuard Static proxy for MongoDB connection"
git push heroku main
heroku logs --tail -a new-reach-backend
git add .
git commit -m "Fix API routes"
git push heroku main
npm install
npm install --save express
curl -X GET https://new-reach-backend.herokuapp.com/api/tokens
curl -X POST -H "Content-Type: application/json"   -d '{"tokenId":"123","buyer":"0xAddress"}'   https://new-reach-backend.herokuapp.com/api/tokens/purchase
heroku logs --tail -a new-reach-backend
git add .
git commit -m "Fix API routes"
git push heroku main
npm install
npm install --save express
curl -X GET https://new-reach-backend.herokuapp.com/api/tokens
curl -X POST -H "Content-Type: application/json"   -d '{"tokenId":"123","buyer":"0xAddress"}'   https://new-reach-backend.herokuapp.com/api/tokens/purchase
heroku logs --tail -a new-reach-backend
curl -X GET https://new-reach-backend.herokuapp.com/api/tokens
curl -X POST -H "Content-Type: application/json"   -d '{"tokenId":"123","buyer":"0xAddress"}'   https://new-reach-backend.herokuapp.com/api/tokens/purchase
heroku logs --tail -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku domains -a new-reach-backend
heroku certs:auto:enable -a new-reach-backend
heroku certs:auto -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku config:get QUOTAGUARDSTATIC_URL -a new-reach-backend
heroku config:set QUOTAGUARDSTATIC_URL=http://7vzzo56af8ywkb:qkc4bpb0rhsrtng44m798oikwt0xv4@us-east-static-01.quotaguard.com:9293 -a new-reach-backend
heroku config:set PORT=3000 -a new-reach-backend
heroku config -a new-reach-backend
npm start
heroku logs --tail -a new-reach-backend
node server.js
heroku config:set MONGO_URI=your_mongo_db_uri
heroku config:set QUOTAGUARDSTATIC_URL=your_quotaguardstatic_url
git add .
git commit -m "Update server.js"
git push heroku main
heroku logs --tail
heroku config:get MONGO_URI -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku config:get MONGO_URI -a new-reach-backend
heroku config:get MONGO_URI -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
heroku config:get MONGO_URI -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
mongodb+srv://phillipdfilkins:JBwlSzRU6uzGp7Ch@cluster0.yt6an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongosh "mongodb+srv://phillipdfilkins:JBwlSzRU6uzGp7Ch@cluster0.yt6an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
heroku config:set MONGO_URI="mongodb+srv://phillipdfilkins:JBwlSzRU6uzGp7Ch@cluster0.yt6an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" -a new-reach-backend
heroku restart -a new-reach-backend
npm start
heroku logs --tail -a new-reach-backend
git add .
git commit -m "Update .env with correct MONGO_URI"
git push heroku main
heroku logs --tail
git add .
git commit -m "Update .env with correct MONGO_URI"
git push heroku main
heroku logs --tail
heroku config:set MONGO_URI=mongodb+srv://phillipdfilkins:JBwlSzRU6uzGp7Ch@cluster0.yt6an.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
heroku config:set QUOTAGUARDSTATIC_URL=http://7vzzo56af8ywkb:qkc4bpb0rhsrtng44m798oikwt0xv4@us-east-static-01.quotaguard.com:9293
git add .
git commit -m "Update .env with correct MONGO_URI"
git push heroku main
heroku logs --tail
heroku config --app new-reach-backend
git add .
git commit -m "Update .env and configuration"
git push heroku main
npm install
npm start
heroku logs --tail -a new-reach-backend
git add package.json
git commit -m "Update Vite and plugin-react versions to resolve dependency conflicts"
git push origin main
npm install --legacy-peer-deps
git pull origin main
git add .
git commit -m "Resolve merge conflicts"
git push origin main
rm -rf node_modules package-lock.json
\npm install
npm install
npm install
npm install
npm cache clean --force
npm install
git add package.json
git commit -m "Resolve merge conflict in package.json"
git push heroku main
heroku logs --tail -a new-reach-backend
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix dependencies"
git push heroku main
rm -rf node_modules package-lock.json
npm install
git add package.json package-lock.json
git commit -m "Fix package.json and resolve merge conflicts"
git push heroku main
heroku logs --tail -a new-reach-backend
rm -rf node_modules package-lock.json
npm install
node server.js
npm install express
npm install express
npm install
git add package.json package-lock.json
git commit -m "Fix package.json issues"
git push heroku main
heroku logs --tail -a new-reach-backend
heroku config:get MONGO_URI -a new-reach-backend
rm -rf node_modules package-lock.json
npm install
git add package.json package-lock.json
git commit -m "Fix package.json and dependencies"
git push heroku main
heroku open -a new-reach-backend
heroku config:set MONGO_URI="mongodb+srv://phillipdfilkins:JBwlSzRU6uzGp7Ch@cluster0.yt6an.mongodb.net/<your-database-name>?retryWrites=true&w=majority" -a new-reach-backend
heroku config:set MONGO_URI="mongodb+srv://phillipdfilkins:JBwlSzRU6uzGp7Ch@cluster0.yt6an.mongodb.net/new-reach-backend?retryWrites=true&w=majority" -a new-reach-backend
heroku restart -a new-reach-backend
heroku logs --tail -a new-reach-backend
npm install express mongoose body-parser cors dotenv helmet express-rate-limit celebrate
git add server.js
git commit -m "Update server.js to remove deprecated MongoDB options"
git push origin main
heroku logs --tail -a new-reach-backend
curl -I http://www.reachtoken.io/
npm install
git add package-lock.json
git commit -m "Synchronize package-lock.json with package.json"
git push origin main
git push heroku main
git pull origin main
