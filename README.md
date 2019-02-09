# Branch Environment Variables Updater for Microsoft App Center

## What?

This tool will allow you to bulk update the Environment Variables for MS App Center branch build configurations. Just paste it into the command line, or set it as a string in an Environment Variable in your own environment where you run the commmand.

## Why?

Because I have 50+ environment variables to set on multiple branch build configurations, Microsoft only allow you to set these via a GUI where you have to paste each key and value individually. That is 100s of copy/paste cycles. No thank you.

## How?

This uses the official [App Center API Service](https://docs.microsoft.com/en-gb/appcenter/api-docs/).

## Usage

This is just a Node script, so you'll need `node` installed.

### 1 - Install

```
npm install -g app-center-environment-variable-updater
```

### 2 - Run

```
app-center-environment-variable-updater
```

## Unattended / CI Mode

You can fully automate this script by setting the relevant variables in your environment.

### MS_AS_ENV

The enviroment variables to set, represented as a string. Example:

```
MS_AS_ENV="X=1\nR=2"
```

### MS_AS_API_KEY

Your API key. Must have full write access. To get your API key, in App Center, go to Account Settings -> API Tokens and create one.

### MS_AS_OWNER_NAME

The owner organisation name, as shown in the URL when viewing the app in App Center.

```
/apps/{owner name}/{app name}/branches/{branch name}/config
```

### MS_AS_APP_NAME

The app name, as shown in the URL when viewing the app in App Center.

```
/apps/{owner name}/{app name}/branches/{branch name}/config
```

### MS_AS_APP_BRANCH

The name of the branch to update the configuration for. The branch must be appearing in App Center for it to work.

### MS_AS_REPLACE_ENV

Whether or not to entirely replace the existing list of variables. If true, all existing ones are deleted first. If false, the variables you provide will be merged.
