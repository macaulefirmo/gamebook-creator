# gamebook-creator

## Requirements

```
nodejs v18.x
```

## Project Setup

```
npm install
```

### Compiles and Hot-reloads for Development

```
npm run electron:serve
```

### Compiles and Minifies for Production

```
npm run electron:build
```

## Test

### Create EPUB File

```
java -jar src/api/components/epubcheck/epubcheck.jar src/api/components/gamebook -mode exp -save
```

## References

### Vuetify

[Vuetify](https://vuetifyjs.com/en/)

### Icons

[MDI](https://pictogrammers.com/library/mdi/)
