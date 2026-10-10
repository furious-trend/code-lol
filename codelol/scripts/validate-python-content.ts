import { pythonCurriculum } from '../lib/python/curriculum';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

function validate() {
    let failed = false;

    if (pythonCurriculum.length !== 15) {
        console.error(`Expected 15 chapters, found ${pythonCurriculum.length}`);
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

            // Run through python3
            const code = lesson.codeExample;
            try {
                // write to temp file
                writeFileSync('/tmp/temp_py_run.py', code);
                const result = execSync('python3 /tmp/temp_py_run.py', { encoding: 'utf-8' }).trim();
                
                if (result !== lesson.expectedOutput) {
                    console.error(`Lesson ${lesson.id} output mismatch.\nExpected:\n${lesson.expectedOutput}\nGot:\n${result}`);
                    failed = true;
                }
            } catch (e: any) {
                console.error(`Lesson ${lesson.id} failed to run with exit code ${e.status}:\n${e.message}\n${e.stderr}`);
                failed = true;
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
