<?php

return [
    'node_binary' => trim((string) shell_exec('which node')) ?: '/usr/bin/node',
    'npm_binary'  => trim((string) shell_exec('which npm'))  ?: '/usr/bin/npm',
];
