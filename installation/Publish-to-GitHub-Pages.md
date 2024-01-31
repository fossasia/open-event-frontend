# Publish to GitHub Pages

Make sure you have the project set up locally first. Follow [these](/docs/installation/local.md) instructions if you haven't already.

## Steps
* Create a new branch (say publish_gh_pages). <br>
```sh
git checkout -b publish_gh_pages
```

* Install <strong>ember-cli-github-pages</strong> addon. <br>
```sh
ember install ember-cli-github-pages
```

*  Open <strong>config/environment.js</strong> file and change the value of `rootURL` from `/` to `open-event-frontend`

* Commit the changes made so far. <br>
```sh
git add -A && git commit -m "Added ember-cli-github-pages addon"
```

* Create the `gh-pages`branch and remove unnecessary files. <br>
```sh
git checkout --orphan gh-pages && rm -rf `bash -c "ls -a | grep -vE '\.gitignore|\.git|node_modules|bower_components|(^[.]{1,2}/?$)'"` && touch .gitkeep && git add -A && git commit -m "initial gh-pages commit"
```
 
* Switch back to the branch created in the first step.<br>
```sh
git checkout publish_gh_pages
```

* Build ember app to the <strong>gh-pages</strong> branch. <br>
```sh
ember gh-pages:commit --message "Initial gh-pages release"
```

* Force push to your clone repository. <br>
```sh
git push -f origin gh-pages
```

You can now access it at `(your-github-username).github.io/openeventfrontend`.

## Note
In case you use something like FISH for your terminal please refer to this [issue](https://github.com/poetic/ember-cli-github-pages/issues/64).


