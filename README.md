<h1 align="center">Setup and Install</h1>

To clone and run this application, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
Clone this repository
$ git clone https://github.com/DLopez6877/2017-ScoutSavvy-Internship

Go into the repository
$ cd 2017-ScoutSavvy-Internship

Install dependencies
$ npm install

Run the app
$ gulp serve
```

#### This project uses a Gulp pipe we are all familiar with but added 7-1 layout for Sass which we learned in class and <strong>[Pug](https://pugjs.org/language/attributes.html)</strong> which is really easy to learn and use. Index file is now located in the views folder and is listed as index.pug

<h1 align="center">
  BRANCHING
  <br><br>
  <img src="http://nvie.com/img/git-model@2x.png" width="700">
  <br>
</h1>


## Feature branches

May branch off from: <br>

* develop

Must merge back into:<br>

* develop

Branch naming convention:<br>

* anything except master, develop, release-\*, or hotfix-\*

## Creating a feature branch

When starting work on a new feature, branch off from the develop branch.
<br>

```bash
$ git checkout -b myfeature develop
```

>Switched to a new branch "myfeature" <br>

## Incorporating a finished feature on develop <br>
Finished features may be merged into the develop branch to definitely add them to the upcoming release: <br>

```bash
$ git checkout develop
```

>Switched to branch 'develop'

```bash
$ git merge --no-ff myfeature
```

>Updating ea1b82a..05e9557<br>
>(Summary of changes)

```bash
$ git branch -d myfeature
```

>Deleted branch myfeature (was 05e9557).

```bash
$ git push origin develop
```

<strong>More details about branching located [here](http://nvie.com/posts/a-successful-git-branching-model/)</strong>
