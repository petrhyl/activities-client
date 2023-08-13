<template>
    <form class="card">
        <div class="form-component">
            <label for="title">Title</label>
            <input type="text" name="title" class="form-input-element" id="activity-title-input">
        </div>
        <div class="form-component">
            <label for="description">Description</label>
            <textarea name="description" class="form-input-element" id="activity-description-text" rows="5"></textarea>
        </div>
        <div class="form-component">
            <label for="category">Category</label>
            <input type="text" name="category" class="form-input-element" id="activity-category-input">
        </div>
        <div class="form-component">
            <label for="date">Date and Time</label>
            <input type="datetime-local" name="date" class="form-input-element" id="activity-date-input">
        </div>
        <div class="form-component">
            <label for="city">City</label>
            <input type="text" name="city" class="form-input-element" id="activity-city-input">
        </div>
        <div class="form-component">
            <label for="venue">Venue</label>
            <input type="text" name="venue" class="form-input-element" id="activity-venue-input">
        </div>
        <div class="form-container">
            <input type="submit" value="Submit">
            <input type="button" value="Cancel">
        </div>
    </form>
</template>


<script setup lang="ts"></script>


<style scoped>
form{
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    padding: 15px;
}

.form-component{
    width: 100%;
    display: flex;
    flex-direction: column;
}

.form-input-element{
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    outline: none;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 7px 10px;
}

.form-component> textarea{
    resize: none;
}

.form-component> label{
    font-size: 11pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    color: #3f3f3f;
    margin: 0 auto 3px 15px;
}

.form-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}

input[type='button'], input[type='submit']{
    font-size: 12pt;
    font-family: 'Gill Sans', Calibri, sans-serif;
    font-weight: 600;
    color: #333131;
    outline: none;
    border: 1px solid #7b9ae1;
    border-radius: 7px;
    padding: 7px 0px;
}

input[type='button']:hover, input[type='submit']:hover{
    border-color: #ade1ff;
}

input[type='button']{
    background-color: #92d7ff;
}

input[type='submit']{
    background-color: #b7ffe7;
}
</style>