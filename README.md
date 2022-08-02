# YipAddress
Functionality for parsing and validating addresses.

## Configuring this as a Submodule

The following configuration is recommended, but it's possible to work with different configuration options.

 - Add the submodule: `git submodule add CLONE_URL`
 - Configure `git status` to print out submodule changes in its summary: `git config status.submodulesummary 1`
 - Configure Git to prevent publishing changes to the main module if there are unpublished submodule changes: `git config push.recurseSubmodules check`
 - Configure Git diffs for submodules to show log of changes to those submodules: `git config diff.submodule log`
 
 To verify the Git configuration worked, do: `git config --list | grep submodule` and inspect the ouptut. Among some other submodule stuff, you should see entries for all the configuraiton settings you applied earlier:
 - `status.submodulesummary=1`
 - `push.recursesubmodules=check`
 - `diff.submodule=log`
