# config

## git

### remotes

git remote add origin-client https://github.com/ZeeEssDoubleU/street-eats-client.git
git remote add origin-server https://github.com/ZeeEssDoubleU/street-eats-server.git

### subtrees

git subtree add --prefix client origin-client master --squash
git subtree add --prefix server origin-server master --squash

### pushes

git push origin -u --all
git subtree push --prefix client origin-client master -u --all
git subtree push --prefix server origin-server master -u --all
