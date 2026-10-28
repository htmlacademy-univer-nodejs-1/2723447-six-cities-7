#!/usr/bin/env node
import 'reflect-metadata';
import {createContainer} from '../shared/container/container.js';
import {Component} from '../shared/container/types.js';
import {Application} from './application.js';

try {
  const application = createContainer().get<Application>(Component.Application);
  application.init();
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
