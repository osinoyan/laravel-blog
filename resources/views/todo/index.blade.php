<!-- {{ $todos }} -->

@foreach ($todos as $todo)
    <div>{{ $todo }}</div>
@endforeach

<form action="/todo" method="POST">
    {{ csrf_field() }}
    <input type="text" placehoder="name" name="title">
    <input type="submit">
</form>