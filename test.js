const { execSync } = require('child_process');
const fs = require('fs');

try {
  const start = Date.now();

  // Run main.js and capture output
  const actual = execSync('node main.js', { encoding: 'utf8' });

  const end = Date.now();
  const durationMs = end - start;

  // Read expected output
  const expected = fs.readFileSync('output.txt', 'utf8');

  if (actual.trim() === expected.trim()) {
    console.log('✅ Test passed! Output matches expected.');
  } else {
    console.log('❌ Test failed! Output does not match expected.');
    // Show a simple diff
    const actualLines = actual.trim().split('\n');
    const expectedLines = expected.trim().split('\n');
    actualLines.forEach((line, i) => {
      if (line !== expectedLines[i]) {
        console.log(`Line ${i + 1}:\n  Expected: ${expectedLines[i]}\n  Actual:   ${line}`);
      }
    });
  }

  console.log(`⏱️  Execution time: ${durationMs} ms`);
} catch (err) {
  console.error('Error running test:', err);
}