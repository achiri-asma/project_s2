<template>
    <div class="profilemed">
        <div class="header">
            <h3>Appointement</h3>
            <router-link to="/">
                <span>Log out</span>&nbsp;
                <img src="../assets/logout.png">
            </router-link>
        </div>
        <div class="main">
            <div class="personinfoooo">
                <div class="search_bar">
                    <select name="choices" id="choice" v-model="selectedOption">
                        <option class="ch" value="today">Today's Appointments</option>
                        <option class="ch" value="future">Future Appointments</option>
                        <option class="ch" value="past">Past Appointments</option>
                        <option class="ch" value="all">All Appointments</option>
                    </select>
                    <div class="search_container">
                        <input type="text" placeholder="Search patients...." class="search_input" v-model="searchQuery">
                        <div class="search_icon">
                            <img src="../assets/search.png" alt="Icône de recherche">
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <div class="con_tainer" v-for="appointment in filteredAppointments" :key="appointment.id">
                        <div class="c1">
                            <img src="../assets/user.png" alt="patient">
                            {{ appointment.patientName }}
                        </div>
                        <div class="c2">
                            <img src="../assets/calendar.png" alt="calendar">
                            {{ formatDate(appointment.date) }}
                        </div>
                        <div class="c3" style="margin-top: 15px;">
                            {{ appointment.demandeType }}
                            &nbsp; &nbsp;&nbsp; &nbsp;
                            <span style="color:red;">
                                ({{ appointment.status }})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            selectedOption: 'all',
            appointments: [],
            searchQuery: null,
        }
    },
    props: ['medecinId'],
    computed: {
        filteredAppointments() {
            let filteredAppointments = this.appointments;

            // Filter by patient name if searchQuery is not empty and patientName is defined
            if (this.searchQuery) {
                filteredAppointments = filteredAppointments.filter(appointment =>
                    appointment.patientName && appointment.patientName.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            return filteredAppointments;
        }
    },
    methods: {
        fetchAppointments() {
            let endpoint = ''
            switch (this.selectedOption) {
                case 'today':
                    endpoint = `http://localhost:7777/service-rdv/rendezvous/medecin/today/${this.medecinId}`;
                    break;
                case 'future':
                    endpoint = `http://localhost:7777/service-rdv/rendezvous/medecin/future/${this.medecinId}`;
                    break;
                case 'past':
                    endpoint = `http://localhost:7777/service-rdv/rendezvous/medecin/past/${this.medecinId}`;
                    break;
                case 'all':
                    endpoint = `http://localhost:7777/service-rdv/rendezvous/medecin/${this.medecinId}`;
                    break;
            }

            axios.get(endpoint)
                .then(response => {
                    this.appointments = response.data.body.map(appointment => {
                        return {
                            ...appointment,
                            patientName: ''
                        };
                    });

                    // Fetch patient names for each appointment
                    return Promise.all(this.appointments.map(async appointment => {
                        const res = await axios.get(`http://localhost:7777/service-profile/api/PatientInfo/${appointment.idPatient}/`);
                        appointment.patientName = res.data.fullName;
                        return appointment;
                    }));
                })
                .catch(error => {
                    console.error(error);
                });
        },
        formatDate(value) {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${year}-${month}-${day} (${hours}:${minutes})`;
        }
    },
    watch: {
        selectedOption() {
            this.fetchAppointments();
        }
    },
    mounted() {
        this.fetchAppointments();
    }
}
</script>


<style>
.profilemed,
.profileuser {
    background-color: rgba(3, 198, 193, 0.2);
    width: 100%;
}

.profilemed .header,
.profileuser .header {
    width: 90%;
    height: 90px;
    background-color: white;
    border-top: none;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 5px 20px 2px rgba(217, 217, 217, 0.707);
}

.profilemed .header h3 {
    color: #03c6c1;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-left: 30px;
}

.profilemed .header a {
    text-decoration: none;
}

.profilemed .header img {
    width: 20px;
    height: 20px;
    margin-right: 30px;
}

.profilemed .main,
.profileuser .main {
    display: flex;
    justify-content: space-between;
    margin: 30px 5%;
}

.profilemed .personinfoooo {
    width: 100%;
    height: 570px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0px 5px 20px 2px rgba(217, 217, 217, 0.707);
}

#choice {
    margin-left: 25px;
    margin-top: 25px;
    width: 320px;
    height: 42.5px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #03c6c1;
    padding-left: 15px;
}

.ch {
    background-color: white;
}

.ch {
    font-family: Poppins;
    font-size: 16px;
    border: 1px solid #03c6c1;
}

.search_container {
    display: flex;
    margin-left: 25px;
    border: #03c6c1 1px solid;
    border-radius: 5px;
    padding: 5px 10px;
    width: 650px;
    margin-left: 50px;
    margin-top: 25px;
}

.search_input {
    border: none;
    background-color: transparent;
    outline: none;
    flex: 1;
    padding: 5px;
}

.search_icon {
    width: 25px;
    height: 25px;
}

.search_icon img {
    width: 100%;
    height: 100%;
}

.search_bar {
    display: flex;
}

.con_tainer {
    display: flex;
    justify-content: space-between;
    width: 94.5%;
    height: 44px;
    border: #03c6c1 1px solid;
    border-radius: 10px;
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 15px;
}

.c1 {
    border-right: #03c6c1 1px solid;
    width: 350px;
    font-size: 14px;
    font-family: Poppins;
}

.c2 {
    border-right: #03c6c1 1px solid;
    width: 380px;
    margin-left: 10px;
    font-size: 14px;
    font-family: Poppins;
}

.c3 {
    margin-left: 10px;
    width: 350px;
    font-size: 14px;
    font-family: Poppins;

}

.c1 img {
    width: 20px;
    height: 20px;
    padding-top: 10px;
    padding-left: 7px;
}

.c2 img {
    height: 20px;
    padding-top: 10px;
}

.c3 img {
    height: 20px;
    padding-top: 10px;
    padding-right: 10px;
    float: right;
}
</style>