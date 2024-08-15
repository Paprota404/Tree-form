using Microsoft.EntityFrameWorkCore;
using TreeDbContext;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TreeDbContext>(options => options.UseNpgsql());


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else{
    app.UseHttpsRedirection();
}

app.Run();


