// agent-notes: { ctx: "Content validator running curriculum code examples via python3", deps: ["../lib/python/curriculum"], state: active, last: "sato@2026-10-11" }
import { pythonCurriculum } from '../lib/python/curriculum';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import os from 'os';
import path from 'path';

function validate() {
    let failed = false;
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const tempFile = path.join(os.tmpdir(), 'temp_py_run.py');

    if (pythonCurriculum.length < 20) {
        console.error(`Expected at least 20 chapters, found ${pythonCurriculum.length}`);
        failed = true;
    }

    for (const chapter of pythonCurriculum) {
        if (!chapter.id || !chapter.title || !chapter.tier || !chapter.technicalCore || !chapter.analogyGeneral || !chapter.analogyTamil || !chapter.roastGeneral || !chapter.roastTamil) {
            console.error(`Chapter ${chapter.id || 'unknown'} is missing fields`);
            failed = true;
        }

        for (const lesson of chapter.lessons) {
            if (!lesson.id || !lesson.title || !lesson.explanation || !lesson.codeExample || !lesson.verificationChecks || !lesson.miniQuiz || !lesson.funnyLineGeneral || !lesson.funnyLineTamil) {
                console.error(`Lesson ${lesson.id || 'unknown'} is missing fields`);
                failed = true;
            }

            // Run through python
            const code = lesson.codeExample;
            try {
                // write to temp file
                writeFileSync(tempFile, code);
                const rawResult = execSync(`${pythonCmd} "${tempFile}"`, { encoding: 'utf-8' });
                const result = rawResult.replace(/\r\n/g, '\n').trim();
                const expected = (lesson.expectedOutput || '').replace(/\r\n/g, '\n').trim();

                if (result !== expected) {
                    console.error(`Lesson ${lesson.id} output mismatch.\nExpected:\n${expected}\nGot:\n${result}`);
                    failed = true;
                }
            } catch (e: any) {
                // If the error is due to an external library not installed in the local CLI environment, skip execution check
                if (e.stderr && e.stderr.includes('ModuleNotFoundError') && (e.stderr.includes('pandas') || e.stderr.includes('numpy') || e.stderr.includes('matplotlib') || e.stderr.includes('mysql') || e.stderr.includes('pymongo') || e.stderr.includes('sklearn') || e.stderr.includes('scipy'))) {
                    console.warn(`Lesson ${lesson.id} skipped local runtime check: external library not installed in CLI environment.`);
                } else {
                    console.error(`Lesson ${lesson.id} failed to run with exit code ${e.status}:\n${e.message}\n${e.stderr}`);
                    failed = true;
                }
            }
        }
    }

    if (failed) {
        process.exit(1);
    } else {
        console.log("Python content validated successfully.");
        process.exit(0);
    }
}

validate();
