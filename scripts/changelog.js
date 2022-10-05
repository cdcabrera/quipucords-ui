const { existsSync, readFileSync } = require('fs');
const { execSync } = require('child_process');
const commitTypes = require('conventional-commit-types');

/**
 * Get last release commit hash
 *
 * @returns {string}
 */
const getReleaseCommit = () => {
  let stdout = '';

  try {
    stdout = execSync(` git log --grep="chore(release)" --pretty=oneline -1`);
  } catch (e) {
    console.log(`Skipping release commit check... ${e.message}`);
  }

  return stdout.toString();
};

/**
 * Return output for a range of commits from a hash
 *
 * @param {string} releaseCommit
 * @returns {string}
 */
const getGit = (releaseCommit = getReleaseCommit()) => {
  let stdout = '';

  try {
    const releaseCommitHash = releaseCommit.split(/\s/)?.[0];
    stdout = execSync(` git log ${releaseCommitHash}..HEAD --pretty=oneline`);
  } catch (e) {
    console.log(`Skipping commit "get" check... ${e.message}`);
  }

  return stdout.toString();
};

/**
 * Return an object of commit groupings based on "conventional-commit-types"
 *
 * @param {string} commits
 * @returns {{'Bug Fixes': string[], Chores: string[], Features: string[]}}
 */
const parseCommits = (commits = getGit()) =>
  commits
    .trim()
    .split(/\n/g)
    .filter(message => /:/.test(message))
    .map(message => {
      console.log('testing >>>', message);

      const [hashTypeScope, ...description] = message.split(/:/);
      const [hash, typeScope = ''] = hashTypeScope.split(/\s/);
      const [type, scope = ''] = typeScope.split('(');
      return {
        hash,
        typeScope,
        type,
        scope: scope.split(')')[0],
        description: description.join(' ').trim()
      };
    })
    .filter(obj => obj.type in commitTypes.types)
    .map(obj => ({ ...obj, typeLabel: obj.type }))
    .reduce((groups, { typeLabel, scope, description, hash }) => {
      const updatedGroups = groups;

      if (!updatedGroups[typeLabel]) {
        updatedGroups[typeLabel] = {
          ...commitTypes.types[typeLabel],
          commits: []
        };
      }

      updatedGroups[typeLabel].commits.push(`* **${scope}** ${description} (${hash})`);
      return updatedGroups;
    }, {});

const semverBump = (parsedCommits = {}) => {
  // const bumpTypes = ['PATCH', 'MINOR', 'MAJOR'];
  let weight = 0;

  Object.entries(parsedCommits).forEach(([key, { commits }]) => {
    switch (key) {
      case 'feat':
      case 'revert':
        weight += 10 * commits.length;
        break;
      case 'refactor':
        weight += 1 * commits.length;
        break;
      case 'build':
      case 'docs':
      case 'fix':
      case 'perf':
      case 'style':
      case 'test':
        weight += 0.1 * commits.length;
        break;
      default:
        break;
    }
  });

  // feat = 1
  // refactor = 0.5
  // perf = 0.25
  // build = 0.25
  // revert = 1

  // fix = 0.1
  // docs = 0.1
  // style= 0.1
  // test = 0.1
  // ci = 0
  // chore = 0

  return {
    // bump: Object.entries(bumps).filter(([key]) => key <= weight),
    // ceil: Math.ceil(weight),
    bump: (weight >= 100 && 'MAJOR') || (weight >= 10 && 'MINOR') || 'PATCH',
    weight
  };
};

const getSemVerCommits = (parsedCommits = parseCommits()) => ({
  recommendedSemVer: semverBump(parsedCommits),
  parsedCommits
});

const updateFiles = (
  { recommendedSemVer, parsedCommits } = getSemVerCommits(),
  { updatePackage = true, updateChangelog = true, packagePath = './package.json' } = {}
) => {
  if (updatePackage && existsSync(packagePath)) {
    currentFileOutput = JSON.parse(readFileSync(fileOutput, 'utf-8'));
  }
};

console.log('commitsGroupingObj', updateFiles());
