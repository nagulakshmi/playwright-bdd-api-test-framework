console.log("All tests are executed from ", process.env.NODE_ENV, "environment")

// execute all the test, if the feature file is not defined.
const current_feature = process.env.FEATURE ? `./features/${process.env.FEATURE}.feature` : './features/**/*.feature'

console.log("Executing current feature from ", current_feature)

const current_tag = process.env.TAG ? `--tags ${process.env.TAG}` : '--tags @smoke'

console.log("Executing current tags as ", current_tag)

const current_parrellel_thread = process.env.MAX_PARALLEL_THREADS ? `--parallel=${process.env.MAX_PARALLEL_THREADS}` : '--parallel=1'

const output_file = 'output/test_results.json'

let common = [
    current_tag,
    '--require common/hooks.ts',
    '--require-module ts-node/register',
    current_parrellel_thread,
    current_feature,
    '-r ./setp-definitions/**/*.ts',
    '-r ./utils/**/*.ts',
    '--publish-quiet',
    `-f json:${output_file}`
].join(' ')

module.exports = {
    default: common
}