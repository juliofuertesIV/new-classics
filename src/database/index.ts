import { Sequelize, DataTypes } from 'sequelize'

const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD

export const sequelize = new Sequelize({ 
    database,
    username,
    password,
    dialect: 'mariadb',
    dialectModule: require('mariadb')
})

// admin shit

export const User = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
})

// jams

export const Jam = sequelize.define('Jams', {
    id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    openDoors: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '20:30:00'
    },
    startJamTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '21:00:00'
    },
    hasGuest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export const Guest = sequelize.define('Guests', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    instagram: {
        type: DataTypes.STRING
    },
    spotify: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    }
})

export const GuestRequest = sequelize.define('GuestRequests', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    spotify: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    }    
})

// content

export const Song = sequelize.define('Songs', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    lyrics: {
        type: DataTypes.TEXT
    },
    name: {
        type: DataTypes.STRING
    },
    musicKey: {
        type: DataTypes.STRING
    },
    spotifyLink: {
        type: DataTypes.STRING
    }
})

export const Artist = sequelize.define('Artists', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    about: {
        type: DataTypes.TEXT
    }
})

// tools

export const HostedImage = sequelize.define('HostedImages', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    alt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


Guest.belongsToMany(Jam, { through: 'JamGuests' })
Jam.belongsToMany(Guest, { through: 'JamGuests' })

GuestRequest.belongsToMany(Jam, { through: 'JamGuestRequests' })
Jam.belongsToMany(GuestRequest, { through: 'JamGuestRequests' })

Song.belongsTo(Artist, { onDelete: 'CASCADE' })
Artist.hasMany(Song)

HostedImage.belongsTo(Artist, { onDelete: 'CASCADE' })
Artist.hasOne(HostedImage)

HostedImage.belongsTo(Guest, { onDelete: 'CASCADE' })
Guest.hasOne(HostedImage)
