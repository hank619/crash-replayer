# Hooks for record crash

## Installing

```bash
npm install use-crash-replayer --save
```
  
## Usage
```
import { useCrashReplayer } from 'use-crash-replayer';

/**
 * use this hook in root layout
 * @param {string} url - The backend url of the crash replayer to report.
 * @param {string} browserId - The unique id to identify device, can use UUID.
 * @param {string} customerId - The biz customer id, can be empty and set it after login.
 */
useCrashReplayer(url, browserId, customerId);
```