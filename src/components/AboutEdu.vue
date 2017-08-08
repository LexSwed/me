<template>
    <div class="about-block">
        <h2>Education</h2>
        <div class="about-edu">
            <div class="edu-dates">
                <span>2012</span>
                <span>-</span>
                <span>2014</span>
            </div>
            <div class="edu-main">
                <h3>Bachelor degree in applied math</h3>
                <p>Volodymyr Dahl East Ukrainian National University</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.about-edu {
    display: flex;
    justify-content: flex-start;
    flex-flow: row nowrap;
    align-items: center;
    .edu-dates {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        height: 80%;
        span {
            font-size: 15px;
            display: flex; justify-content: center; align-items: center;
            background-color: var(--text-color);
            color: var(--main);
            border-radius: calc(var(--b-r) - 2px);
            font-weight: 700;
            box-shadow: var(--block-shadow);
            padding: 0 4px;
            margin: 2px 0;
        }
    }
    .edu-main {
        padding-left: 20px;
        p {
            padding: 0; margin: 5px 0;
            font-size: 16px;
        }
    }
    h3, h4 {
        margin: 0;
    }
}
</style>

