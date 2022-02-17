module.exports = {
    'type': 'postgres',
    'url': 'postgres://postgres:password@localhost:5444/postgres',
    'entities': [process.env.ENTITY_PATH],
    'synchronize': true
}