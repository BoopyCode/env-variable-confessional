#!/usr/bin/env node

// ENV CONFESSIONAL BOOTH - Where your .env sins are absolved
// Step right up and confess your environmental transgressions!

const fs = require('fs');
const path = require('path');

// The sacred texts (reference .env file)
const REFERENCE_ENV = '.env.example';
// Your sinful local copy
const LOCAL_ENV = '.env';

function confessSins() {
    console.log('\n📿 ENV CONFESSIONAL BOOTH 📿');
    console.log('Bless me Father, for I have sinned...\n');
    
    // Check if reference exists (otherwise we're all heretics)
    if (!fs.existsSync(REFERENCE_ENV)) {
        console.log('❌ No .env.example found! Who wrote this liturgy?');
        process.exit(1);
    }
    
    // Read the holy scriptures
    const reference = fs.readFileSync(REFERENCE_ENV, 'utf8');
    const refVars = new Set(
        reference.split('\n')
            .filter(line => line.trim() && !line.startsWith('#'))
            .map(line => line.split('=')[0].trim())
    );
    
    // Check if sinner has a local confession
    if (!fs.existsSync(LOCAL_ENV)) {
        console.log('❌ No .env file! Are you even trying to sin?');
        console.log('\nYour missing sins:');
        refVars.forEach(v => console.log(`  - ${v}=???`));
        process.exit(1);
    }
    
    // Read the sinner's confession
    const local = fs.readFileSync(LOCAL_ENV, 'utf8');
    const localVars = new Set(
        local.split('\n')
            .filter(line => line.trim() && !line.startsWith('#'))
            .map(line => line.split('=')[0].trim())
    );
    
    // Compare sins to scripture
    const missingVars = [...refVars].filter(v => !localVars.has(v));
    const extraVars = [...localVars].filter(v => !refVars.has(v));
    
    // Absolution or condemnation
    if (missingVars.length === 0 && extraVars.length === 0) {
        console.log('✅ Your soul is clean! Go forth and code.');
        return;
    }
    
    if (missingVars.length > 0) {
        console.log('❌ MISSING SINS (variables):');
        missingVars.forEach(v => console.log(`  - ${v}=???`));
    }
    
    if (extraVars.length > 0) {
        console.log('⚠️  EXTRA SINS (unexpected variables):');
        extraVars.forEach(v => console.log(`  - ${v}`));
    }
    
    console.log('\n🙏 Say 3 Hail Marys and fix your .env file');
    process.exit(1);
}

// Let the confession begin!
confessSins();
